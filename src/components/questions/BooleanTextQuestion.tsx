import { motion, AnimatePresence } from 'framer-motion';
import type { Question, Language } from '../../types/survey';

export interface BooleanAnswer {
  choice: string;
  text?: string;
}

interface Props {
  question: Question;
  currentAnswer: BooleanAnswer | undefined;
  language: Language;
  localText: string;
  setLocalText: (value: string) => void;
  onChange: (value: BooleanAnswer) => void;
}

export const BooleanTextQuestion = ({
  question,
  currentAnswer,
  language,
  localText,
  setLocalText,
  onChange,
}: Props) => {
  const placeholder = question.placeholder?.[language] ??
    (language === 'en' ? 'Share what comes to mind...' : 'Shiriki kinachokuja akilini...');

  return (
    <div className="space-y-6">
      {/* Yes / No buttons */}
      <div className="flex gap-4" role="radiogroup" aria-label={question.title[language]}>
        {question.options?.map((opt) => {
          const isSelected = currentAnswer?.choice === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChange({ ...currentAnswer, choice: opt.id })}
              role="radio"
              aria-checked={isSelected}
              className={`
                flex-1 py-5 rounded-2xl border-2 text-center text-lg font-light
                transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30
                ${isSelected
                  ? 'border-secondary bg-primary/25 dark:bg-primary/15 text-foreground shadow-md shadow-secondary/10'
                  : 'border-border bg-card/50 text-foreground hover:border-secondary/60 hover:bg-card'
                }
              `}
            >
              {opt.label[language]}
            </button>
          );
        })}
      </div>

      {/* Conditional follow-up — only for 'yes' */}
      <AnimatePresence>
        {currentAnswer?.choice === 'yes' && question.followUp && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pt-2 space-y-3">
              <label
                htmlFor={`followup-${question.id}`}
                className="block text-base text-muted-foreground font-light italic"
              >
                {question.followUp[language]}
              </label>
              <textarea
                id={`followup-${question.id}`}
                value={localText}
                onChange={(e) => setLocalText(e.target.value)}
                className="
                  w-full min-h-[120px] p-5 bg-card/50 border-2 border-border rounded-2xl
                  focus:outline-none focus:border-secondary focus:bg-card
                  resize-none transition-all duration-300
                  text-base font-light leading-relaxed text-foreground
                  placeholder:text-muted-foreground/60
                "
                placeholder={placeholder}
                aria-label={question.followUp[language]}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
