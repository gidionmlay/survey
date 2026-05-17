import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSurvey } from '../../context/SurveyContext';
import { translations } from '../../i18n/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';
import { submitSurvey } from '../../services/api';

import { questions } from '../../data/questions';

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
    // Guard: block any call after the first, unless this is an explicit retry
    // from the error screen (which resets the lock first).
    if (hasSubmittedRef.current && !isRetry) {
      console.warn('[CompletionScreen] Submission blocked — already submitted.');
      return;
    }
    hasSubmittedRef.current = true;

    setIsSubmitting(true);
    setError(null);
    try {
      // Map responses to readable English labels for backend analytics readiness
      const formattedResponses: Record<string, any> = {};

      for (const [qId, answer] of Object.entries(responses)) {
        const questionDef = questions.find(q => q.id === qId);
        if (!questionDef) {
          formattedResponses[qId] = answer;
          continue;
        }

        // Multi-select array mapping
        if (Array.isArray(answer)) {
          formattedResponses[qId] = answer.map(id => {
            const opt = questionDef.options?.find(o => o.id === id);
            return opt ? opt.label['en'] : id;
          });
        }
        // Boolean-text object mapping
        else if (typeof answer === 'object' && answer !== null && 'choice' in answer) {
          const opt = questionDef.options?.find(o => o.id === answer.choice);
          const choiceLabel = opt ? opt.label['en'] : answer.choice;
          formattedResponses[qId] = {
            choice: choiceLabel,
            text: answer.text || ''
          };
        }
        // Single choice mapping
        else {
          const opt = questionDef.options?.find(o => o.id === answer);
          formattedResponses[qId] = opt ? opt.label['en'] : answer;
        }
      }

      const payload = {
        timestamp: new Date().toISOString(),
        firstName,
        email,
        language,
        responses: formattedResponses
      };

      await submitSurvey(payload);
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
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="mb-8"
          >
            <Loader2 className="w-12 h-12 text-primary/50" />
          </motion.div>
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
            className="px-8 py-3 bg-primary/10 text-primary rounded-full text-lg font-medium transition-all duration-300 hover:bg-primary/20"
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
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8">
            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-accent mb-8 tracking-tight">
            {titleText}
          </h1>
          
          <div className="space-y-6 text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-12">
            {t.message.split('\n\n').map((paragraph: string, idx: number) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <button
            onClick={() => {
              // Optionally reset survey here
              localStorage.removeItem('cadence_survey_state');
              window.location.reload();
            }}
            className="px-10 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          >
            {t.finish}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
