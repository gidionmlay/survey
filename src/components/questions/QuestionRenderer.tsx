import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSurvey } from '../../context/SurveyContext';
import type { Question } from '../../types/survey';
import { SingleChoiceQuestion } from './SingleChoiceQuestion';
import { MultiChoiceQuestion } from './MultiChoiceQuestion';
import { ScaleQuestion } from './ScaleQuestion';
import { BooleanTextQuestion } from './BooleanTextQuestion';
import type { BooleanAnswer } from './BooleanTextQuestion';
import { TextAreaQuestion } from './TextAreaQuestion';
import { TransitionScreen } from './TransitionScreen';
import { TransitionMessage } from './TransitionMessage';
import { translations } from '../../i18n/translations';
import { personalizeText } from '../../lib/utils';

// ── Type guards ───────────────────────────────────────────────────────────────

function isBooleanAnswer(v: unknown): v is BooleanAnswer {
  return (
    v !== null &&
    typeof v === 'object' &&
    !Array.isArray(v) &&
    'choice' in v &&
    typeof (v as Record<string, unknown>).choice === 'string'
  );
}

// ── Microcopy: emotional messages shown after specific question types ─────────

const AFTER_MESSAGES: Record<string, { en: string; sw: string }> = {
  q1: { en: 'Thank you for your honesty.', sw: 'Asante kwa uaminifu wako.' },
  q4: { en: 'Those feelings are more common than you might think.', sw: 'Hisia hizo ni za kawaida zaidi kuliko unavyodhani.' },
  q5: { en: 'Acknowledging stress is the first step.', sw: 'Kukubali msongo ni hatua ya kwanza.' },
  q6: { en: 'Many people share that exact experience.', sw: 'Watu wengi wanashiriki uzoefu huo huo.' },
  q8: { en: 'There\'s no wrong way to feel about money.', sw: 'Hakuna njia mbaya ya kuhisi kuhusu pesa.' },
  q10: { en: 'Trying — even if it didn\'t stick — shows intention.', sw: 'Kujaribu — hata kama halikudumu — kunaonyesha nia.' },
  q14: { en: 'That\'s a meaningful vision to hold onto.', sw: 'Hiyo ni maono ya maana ya kushikilia.' },
};

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  question: Question;
}

// ── Component ─────────────────────────────────────────────────────────────────

export const QuestionRenderer: React.FC<Props> = ({ question }) => {
  const { language, nextStep, prevStep, responses, setResponse, firstName } = useSurvey();
  const t = translations[language].nav;
  const tOptional = translations[language].optionalReflection;
  const currentAnswer = responses[question.id];

  // ── Local text state (textarea & boolean-text follow-ups & hybrid reflection)
  const getTextFromAnswer = (): string => {
    if (isBooleanAnswer(currentAnswer)) return currentAnswer.text ?? '';
    if ((question.type === 'textarea' || question.type === 'hybrid') &&
        typeof currentAnswer === 'string') return currentAnswer;
    if (question.type === 'hybrid' && isBooleanAnswer(currentAnswer)) return currentAnswer.text ?? '';
    return '';
  };

  const getHybridTextFromAnswer = (): string => {
    if (question.type === 'hybrid' && typeof responses[`${question.id}_text`] === 'string') {
      return responses[`${question.id}_text`] as string;
    }
    return '';
  };

  const [localText, setLocalText] = useState(getTextFromAnswer);
  const [hybridText, setHybridText] = useState(getHybridTextFromAnswer);
  const [showOptional, setShowOptional] = useState(false);
  const [error, setError] = useState('');
  const [showMicrocopy, setShowMicrocopy] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Reset state when question changes
  useEffect(() => {
    setLocalText(getTextFromAnswer());
    setHybridText(getHybridTextFromAnswer());
    setShowOptional(false);
    setError('');
    // Show emotional microcopy with a brief delay
    const timer = setTimeout(() => setShowMicrocopy(true), 300);
    if (titleRef.current) titleRef.current.focus();
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  // ── Transition screen — handled separately, no nav chrome needed
  if (question.type === 'transition') {
    return (
      <TransitionScreen
        question={question}
        language={language}
        onContinue={nextStep}
      />
    );
  }

  // ── Validation & next ─────────────────────────────────────────────────────

  const handleNext = () => {
    if (question.required) {
      let isAnswered = false;
      if (question.type === 'textarea') {
        isAnswered = !!localText.trim();
      } else if (question.type === 'boolean-text') {
        isAnswered = isBooleanAnswer(currentAnswer) && !!currentAnswer.choice;
      } else if (question.type === 'multiple' || question.type === 'hybrid') {
        isAnswered = Array.isArray(currentAnswer) && currentAnswer.length > 0;
      } else {
        isAnswered = currentAnswer !== undefined && currentAnswer !== null && currentAnswer !== '';
      }

      if (!isAnswered) {
        setError(language === 'en'
          ? 'Please select an answer to continue.'
          : 'Tafadhali chagua jibu ili kuendelea.');
        return;
      }
    }

    // Persist textarea value
    if (question.type === 'textarea') {
      setResponse(question.id, localText);
    }
    // Persist boolean-text with optional follow-up text
    if (question.type === 'boolean-text') {
      const base: BooleanAnswer = isBooleanAnswer(currentAnswer)
        ? currentAnswer
        : { choice: '' };
      setResponse(question.id, { ...base, text: localText });
    }
    // Persist hybrid optional reflection separately
    if (question.type === 'hybrid' && hybridText.trim()) {
      setResponse(`${question.id}_text`, hybridText);
    }

    setError('');
    nextStep();
  };

  // ── Answer handlers ───────────────────────────────────────────────────────

  const handleSingleSelect = (val: string) => {
    setResponse(question.id, val);
    setError('');
    setTimeout(() => nextStep(), 350);
  };

  const handleScaleSelect = (val: string) => {
    setResponse(question.id, val);
    setError('');
    setTimeout(() => nextStep(), 500);
  };

  const handleMultiSelect = (val: string[]) => {
    setResponse(question.id, val);
    setError('');
  };

  const handleHybridSelect = (val: string[]) => {
    setResponse(question.id, val);
    setError('');
  };

  const handleBooleanSelect = (val: BooleanAnswer) => {
    setResponse(question.id, val);
    setError('');
  };

  // ── Text interpolation ────────────────────────────────────────────────────

  const interpolate = (text: string) =>
    personalizeText(text, firstName);

  const questionTitle = interpolate(question.title[language]);
  const questionSubtitle = question.subtitle ? interpolate(question.subtitle[language]) : null;
  const questionHelper  = question.helperText ? interpolate(question.helperText[language]) : null;

  // Microcopy for this question (shown after entering the screen)
  const afterMsg = AFTER_MESSAGES[question.id];

  // Hybrid: optional reflection section
  const hybridSelected = Array.isArray(responses[question.id])
    ? (responses[question.id] as string[])
    : [];
  const hasHybridSelection = hybridSelected.length > 0;
  const hybridPlaceholder = question.placeholder?.[language] ??
    (language === 'en' ? 'Share as little or as much as you\'d like...' : 'Shiriki kidogo au kama unavyotaka...');
  const optionalPrompt = question.optionalTextPrompt?.[language] ??
    (language === 'en' ? 'Would you like to share more?' : 'Ungependa kushiriki zaidi?');

  // ── Determine if Next button should show ─────────────────────────────────
  const showNext = question.type !== 'single' && question.type !== 'scale';

  return (
    <div className="flex-1 flex flex-col w-full">

      {/* ── Emotional microcopy (shows after entry) */}
      {afterMsg && (
        <TransitionMessage
          message={afterMsg[language]}
          visible={showMicrocopy}
          variant="calm"
        />
      )}

      {/* ── Question title */}
      <h2
        ref={titleRef}
        className="text-2xl md:text-3xl font-light text-foreground mb-3 leading-relaxed focus:outline-none"
        tabIndex={-1}
      >
        {questionTitle}
      </h2>

      {/* ── Subtitle (softer secondary framing) */}
      {questionSubtitle && (
        <p className="text-sm md:text-base text-muted-foreground font-light mb-8 leading-relaxed">
          {questionSubtitle}
        </p>
      )}
      {!questionSubtitle && <div className="mb-8" />}

      {/* ── Question input area */}
      <div className="flex-1 relative">

        {/* Single choice */}
        {question.type === 'single' && (
          <SingleChoiceQuestion
            question={question}
            currentAnswer={typeof currentAnswer === 'string' ? currentAnswer : undefined}
            language={language}
            onChange={handleSingleSelect}
          />
        )}

        {/* Multiple choice */}
        {question.type === 'multiple' && (
          <MultiChoiceQuestion
            question={question}
            currentAnswer={Array.isArray(currentAnswer) ? (currentAnswer as string[]) : undefined}
            language={language}
            onChange={handleMultiSelect}
          />
        )}

        {/* Hybrid: multiple choice + optional reflection */}
        {question.type === 'hybrid' && (
          <div className="space-y-6">
            <MultiChoiceQuestion
              question={question}
              currentAnswer={Array.isArray(currentAnswer) ? (currentAnswer as string[]) : undefined}
              language={language}
              onChange={handleHybridSelect}
            />

            {/* Optional reflection — appears after first selection */}
            <AnimatePresence>
              {hasHybridSelection && question.allowOptionalText && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 border-t border-border/50">
                    {/* Toggle reveal */}
                    <button
                      onClick={() => setShowOptional((v) => !v)}
                      className="
                        flex items-center gap-2 text-sm text-muted-foreground
                        hover:text-foreground transition-colors duration-200
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded
                        mb-4 mt-4
                      "
                      aria-expanded={showOptional}
                    >
                      <span className={`
                        w-4 h-4 rounded-full border-2 border-current flex items-center justify-center
                        transition-transform ${showOptional ? 'rotate-45' : ''}
                      `}>
                        <svg viewBox="0 0 10 10" className="w-2 h-2" fill="currentColor">
                          <path d="M5 2v6M2 5h6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"/>
                        </svg>
                      </span>
                      <span className="italic font-light">
                        {showOptional ? tOptional.hideLabel : optionalPrompt}
                      </span>
                    </button>

                    <AnimatePresence>
                      {showOptional && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35 }}
                          className="overflow-hidden"
                        >
                          <textarea
                            value={hybridText}
                            onChange={(e) => setHybridText(e.target.value)}
                            className="
                              w-full min-h-[120px] p-5 bg-card/50 border-2 border-border rounded-2xl
                              focus:outline-none focus:border-secondary focus:bg-card
                              resize-none transition-all duration-300
                              text-base font-light leading-relaxed text-foreground
                              placeholder:text-muted-foreground/60
                            "
                            placeholder={hybridPlaceholder}
                            aria-label={optionalPrompt}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Scale */}
        {question.type === 'scale' && (
          <ScaleQuestion
            question={question}
            currentAnswer={typeof currentAnswer === 'string' ? currentAnswer : undefined}
            language={language}
            onChange={handleScaleSelect}
          />
        )}

        {/* Boolean-text (Yes/No + conditional follow-up) */}
        {question.type === 'boolean-text' && (
          <BooleanTextQuestion
            question={question}
            currentAnswer={isBooleanAnswer(currentAnswer) ? currentAnswer : undefined}
            language={language}
            localText={localText}
            setLocalText={setLocalText}
            onChange={handleBooleanSelect}
          />
        )}

        {/* Textarea */}
        {question.type === 'textarea' && (
          <TextAreaQuestion
            question={question}
            language={language}
            localText={localText}
            setLocalText={setLocalText}
          />
        )}

        {/* Helper text */}
        {questionHelper && (
          <p className="mt-5 text-xs text-muted-foreground/80 font-light italic text-center">
            {questionHelper}
          </p>
        )}

        {/* Validation error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-amber-600/80 mt-5 text-sm text-center font-light"
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── Navigation ───────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-border/40">
        <button
          onClick={prevStep}
          className="
            group inline-flex items-center gap-2 px-4 py-2.5
            text-muted-foreground hover:text-foreground
            transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-full
            text-sm
          "
          aria-label="Go back to previous step"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          {t.back}
        </button>

        {showNext && (
          <button
            onClick={handleNext}
            className="
              group inline-flex items-center gap-2 px-6 py-3
              bg-secondary/15 text-secondary rounded-full font-medium
              transition-all duration-300 hover:bg-secondary hover:text-secondary-foreground
              dark:bg-secondary/30 dark:text-primary dark:hover:bg-secondary dark:hover:text-secondary-foreground
              focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30
              text-sm
            "
            aria-label="Go to next step"
          >
            {t.next}
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
