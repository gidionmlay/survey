import React, { useState, useEffect, useRef } from 'react';
import { useSurvey } from '../../context/SurveyContext';
import type { Question } from '../../data/questions';
import { SingleChoiceQuestion } from './SingleChoiceQuestion';
import { MultiChoiceQuestion } from './MultiChoiceQuestion';
import { ScaleQuestion } from './ScaleQuestion';
import { BooleanTextQuestion } from './BooleanTextQuestion';
import { TextAreaQuestion } from './TextAreaQuestion';
import { TransitionScreen } from './TransitionScreen';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { translations } from '../../i18n/translations';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  question: Question;
}

export const QuestionRenderer: React.FC<Props> = ({ question }) => {
  const { language, nextStep, prevStep, responses, setResponse, firstName } = useSurvey();
  const t = translations[language].nav;
  const currentAnswer = responses[question.id];
  
  const [localText, setLocalText] = useState(currentAnswer?.text || currentAnswer || '');
  const [error, setError] = useState('');
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Reset local state when question changes
  useEffect(() => {
    setLocalText(currentAnswer?.text || (typeof currentAnswer === 'string' && question.type === 'textarea' ? currentAnswer : ''));
    setError('');
    // Focus title for screen readers / accessibility
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [question.id]);

  const handleNext = () => {
    if (question.required) {
      let isAnswered = false;
      if (question.type === 'textarea') {
        isAnswered = !!localText.trim();
      } else if (question.type === 'boolean-text') {
        isAnswered = !!currentAnswer?.choice;
      } else if (question.type === 'multiple') {
        isAnswered = Array.isArray(currentAnswer) && currentAnswer.length > 0;
      } else {
        isAnswered = currentAnswer !== undefined && currentAnswer !== null && currentAnswer !== '';
      }

      if (!isAnswered) {
        setError(language === 'en' ? 'Please select an answer to continue.' : 'Tafadhali chagua jibu ili kuendelea.');
        return;
      }
    }

    if (question.type === 'textarea') {
      setResponse(question.id, localText);
    }
    if (question.type === 'boolean-text') {
      setResponse(question.id, { ...currentAnswer, text: localText });
    }
    
    setError('');
    nextStep();
  };

  const handleSingleSelect = (val: string) => {
    setResponse(question.id, val);
    setError('');
    setTimeout(() => nextStep(), 400);
  };

  const handleMultiSelect = (val: string[]) => {
    setResponse(question.id, val);
    setError('');
  };

  const handleBooleanSelect = (val: any) => {
    setResponse(question.id, val);
    setError('');
  };

  const questionText = question.title[language].replace('{firstName}', firstName || '');

  return (
    <div className="flex-1 flex flex-col w-full">
      <h2 
        ref={titleRef}
        className="text-2xl md:text-3xl font-light text-foreground mb-10 leading-relaxed focus:outline-none"
        tabIndex={-1}
      >
        {questionText}
      </h2>

      <div className="flex-1 relative">
        {question.type === 'single' && (
          <SingleChoiceQuestion question={question} currentAnswer={currentAnswer} language={language} onChange={handleSingleSelect} />
        )}
        {question.type === 'multiple' && (
          <MultiChoiceQuestion question={question} currentAnswer={currentAnswer} language={language} onChange={handleMultiSelect} />
        )}
        {question.type === 'scale' && (
          <ScaleQuestion question={question} currentAnswer={currentAnswer} onChange={handleSingleSelect} />
        )}
        {question.type === 'boolean-text' && (
          <BooleanTextQuestion question={question} currentAnswer={currentAnswer} language={language} localText={localText} setLocalText={setLocalText} onChange={handleBooleanSelect} />
        )}
        {question.type === 'textarea' && (
          <TextAreaQuestion localText={localText} setLocalText={setLocalText} />
        )}
        {question.type === 'transition' && (
          <TransitionScreen question={question} language={language} />
        )}

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-amber-600/80 mt-6 text-center font-light absolute -bottom-8 left-0 right-0"
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-16 pt-6 border-t border-border/50">
        <button
          onClick={prevStep}
          className="group inline-flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          aria-label="Go back to previous step"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t.back}
        </button>
        
        {question.type !== 'single' && question.type !== 'scale' && (
          <button
            onClick={handleNext}
            className="group inline-flex items-center gap-2 px-6 py-2.5 bg-primary/10 text-primary rounded-full font-medium transition-all hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Go to next step"
          >
            {t.next}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};
