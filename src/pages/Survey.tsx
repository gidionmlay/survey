import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IntroSlide } from '@/components/IntroSlide';
import { UserForm } from '@/components/UserForm';
import { QuestionCard } from '@/components/QuestionCard';
import { CompletionSlide } from '@/components/CompletionSlide';
import { surveyQuestions } from '@/data/questions';

type SurveyState = 'intro' | 'form' | 'survey' | 'complete';

export default function Survey() {
  const [state, setSurveyState] = useState<SurveyState>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [userData, setUserData] = useState({ name: '', email: '' });
  // Track direction for sliding animation
  const [direction, setDirection] = useState(1);

  const totalQuestions = surveyQuestions.length;

  const handleStart = useCallback(() => {
    setSurveyState('form');
    setDirection(1);
    window.scrollTo({ top: 0 });
  }, []);

  const handleUserFormComplete = (data: { name: string; email: string }) => {
    setUserData(data);
    setSurveyState('survey');
    setCurrentIndex(0);
    setDirection(1);
    window.scrollTo({ top: 0 });
  };

  const handleBackToIntro = () => {
    setSurveyState('intro');
    setDirection(-1);
    window.scrollTo({ top: 0 });
  };

  const handleNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSurveyState('complete');
    }
  }, [currentIndex, totalQuestions]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex]);

  const handleFinish = useCallback(() => {
    console.log('Final Data:', { ...userData, answers });
    setSurveyState('intro');
    setCurrentIndex(0);
    setAnswers({});
    setUserData({ name: '', email: '' });
    setDirection(1);
    window.scrollTo({ top: 0 });
  }, [answers, userData]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (state === 'intro') {
        if (e.key === 'Enter' || e.key === 'ArrowRight') handleStart();
        return;
      }
      if (state === 'survey') {
        const q = surveyQuestions[currentIndex];
        const hasAnswer = answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== '';

        if (e.key === 'ArrowRight' || e.key === 'Enter') {
          if (hasAnswer) handleNext();
        }
        if (e.key === 'ArrowLeft') {
          handlePrevious();
        }
        
        // Number keys 1-9 for quick selections
        const num = parseInt(e.key, 10);
        if (!isNaN(num) && num >= 1 && num <= 9) {
          if (q.type === 'multiple-choice' && q.options && q.options[num - 1]) {
            setAnswers(prev => ({ ...prev, [q.id]: q.options![num - 1].id }));
          }
          if (q.type === 'likert' && num >= 1 && num <= 5) {
            setAnswers(prev => ({ ...prev, [q.id]: num }));
          }
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [state, currentIndex, handleStart, handleNext, handlePrevious, answers]);

  const handleAnswer = (value: unknown) => {
    const q = surveyQuestions[currentIndex];
    setAnswers(prev => ({ ...prev, [q.id]: value }));
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <AnimatePresence mode="wait">
      {state === 'intro' && (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <IntroSlide onStart={handleStart} />
        </motion.div>
      )}

      {state === 'form' && (
        <motion.div
          key="form"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <UserForm onBack={handleBackToIntro} onComplete={handleUserFormComplete} />
        </motion.div>
      )}

      {state === 'survey' && (
        <div key="survey-container" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-background">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.4 }
              }}
              className="w-full flex justify-center py-12"
            >
              <QuestionCard
                question={surveyQuestions[currentIndex]}
                currentIndex={currentIndex}
                total={totalQuestions}
                answer={answers[surveyQuestions[currentIndex].id] ?? null}
                onAnswer={handleAnswer}
                onNext={handleNext}
                isLast={currentIndex === totalQuestions - 1}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {state === 'complete' && (
        <motion.div
          key="complete"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CompletionSlide onFinish={handleFinish} userData={userData} answers={answers} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
