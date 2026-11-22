import { useState, useEffect, useRef, useCallback } from 'react';
import { useSurvey } from '../../context/SurveyContext';
import { translations } from '../../i18n/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { submitSurvey } from '../../services/api';
import { questions } from '../../data/questions';

interface BooleanAnswer {
  choice: string;
  text?: string;
}

function isBooleanAnswer(v: unknown): v is BooleanAnswer {
  return (
    v !== null &&
    typeof v === 'object' &&
    !Array.isArray(v) &&
    'choice' in v &&
    typeof (v as Record<string, unknown>).choice === 'string'
  );
}

export const CompletionScreen: React.FC = () => {
  const { language, firstName, email, responses } = useSurvey();
  const t = translations[language].completion;
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Idempotency guard ────────────────────────────────────────────────────
  // useRef persists across React StrictMode's intentional unmount/remount
  // cycle in development. This is the single source-of-truth lock that
  // prevents submitData() from being called more than once per component
  // lifetime, even if the effect fires twice.
  const hasSubmittedRef = useRef(false);

  const submitData = useCallback(async (isRetry = false) => {
    // Guard: block any call after the first, unless this is an explicit retry.
    if (hasSubmittedRef.current && !isRetry) {
      console.warn('[CompletionScreen] Submission blocked — already submitted.');
      return;
    }
    hasSubmittedRef.current = true;

    setIsSubmitting(true);
    setError(null);
    try {
      // Map responses to readable English labels for backend analytics readiness
      const formattedResponses: Record<string, unknown> = {};

      for (const [qId, answer] of Object.entries(responses)) {
        const questionDef = questions.find(q => q.id === qId);
        if (!questionDef) {
          formattedResponses[qId] = answer;
          continue;
        }

        // Multi-select array mapping
        if (Array.isArray(answer)) {
          formattedResponses[qId] = (answer as string[]).map(id => {
            const opt = questionDef.options?.find(o => o.id === id);
            return opt ? opt.label.en : id;
          });
        }
        // Boolean-text object mapping
        else if (isBooleanAnswer(answer)) {
          const opt = questionDef.options?.find(o => o.id === answer.choice);
          const choiceLabel = opt ? opt.label.en : answer.choice;
          formattedResponses[qId] = {
            choice: choiceLabel,
            text: answer.text ?? ''
          };
        }
        // Single choice / scale / textarea mapping
        else if (typeof answer === 'string') {
          const opt = questionDef.options?.find(o => o.id === answer);
          formattedResponses[qId] = opt ? opt.label.en : answer;
        } else {
          formattedResponses[qId] = answer;
        }
      }

      const payload = {
        timestamp: new Date().toISOString(),
        firstName,
        email,
        language,
        responses: formattedResponses
      };

      const submitPromise = submitSurvey(payload);
      const minWaitPromise = new Promise(resolve => setTimeout(resolve, 2000));
      
      await Promise.all([submitPromise, minWaitPromise]);
      setIsSubmitting(false);
    } catch (err) {
      console.error('Survey submission failed:', err);
      // On failure, reset the lock so the user can retry
      hasSubmittedRef.current = false;
      setError(
        language === 'en'
          ? 'Something interrupted the submission. Please try again.'
          : 'Kuna kitu kimekatiza uwasilishaji. Tafadhali jaribu tena.'
      );
      setIsSubmitting(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    submitData();
  }, [submitData]);

  const titleText = t.title.replace('{firstName}', firstName || '');

  return (
    <AnimatePresence mode="wait">
      {isSubmitting ? (
        <motion.div
          key="submitting"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center min-h-[60vh] text-center"
        >
          <div className="mb-12">
            <div className="typewriter">
              <div className="slide"><i></i></div>
              <div className="paper"></div>
              <div className="keyboard"></div>
            </div>
          </div>
          <h2 className="text-2xl font-light text-muted-foreground">
            {language === 'en' ? 'Submitting your reflections...' : 'Tunawasilisha tafakari zako...'}
          </h2>
        </motion.div>
      ) : error ? (
        <motion.div
          key="error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center min-h-[60vh] text-center"
        >
          <div className="mb-8">
            <AlertCircle className="w-12 h-12 text-muted-foreground/50" />
          </div>
          <h2 className="text-xl font-light text-muted-foreground mb-8">
            {error}
          </h2>
          <button
            onClick={() => submitData(true)}
            className="px-8 py-3 bg-secondary/15 text-secondary rounded-full text-lg font-medium transition-all duration-300 hover:bg-secondary hover:text-secondary-foreground dark:bg-secondary/30 dark:text-primary"
          >
            {language === 'en' ? 'Try Again' : 'Jaribu Tena'}
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="complete"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center min-h-[70vh] max-w-2xl mx-auto px-6 text-center"
        >
          <div className="w-20 h-20 bg-accent/45 dark:bg-accent/20 rounded-full flex items-center justify-center mb-8">
            <svg className="w-10 h-10 text-foreground dark:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-8 tracking-tight">
            {titleText}
          </h1>

          <div className="space-y-6 text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-12">
            {t.message.split('\n\n').map((paragraph: string, idx: number) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <button
            onClick={() => {
              localStorage.removeItem('cadence_survey_state');
              window.location.reload();
            }}
            className="px-10 py-4 bg-energy text-energy-foreground rounded-full text-lg font-semibold transition-all duration-300 hover:bg-energy/90 hover:shadow-lg hover:shadow-energy/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-energy"
          >
            {t.finish}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
