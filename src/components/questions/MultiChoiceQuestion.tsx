import { motion } from 'framer-motion';
import type { Question, Language } from '../../types/survey';

interface Props {
  question: Question;
  currentAnswer: string[] | undefined;
  language: Language;
  onChange: (value: string[]) => void;
}

export const MultiChoiceQuestion = ({ question, currentAnswer, language, onChange }: Props) => {
  const selected = Array.isArray(currentAnswer) ? currentAnswer : [];

  const handleToggle = (optionId: string) => {
    let next: string[];
    if (selected.includes(optionId)) {
      next = selected.filter((id) => id !== optionId);
    } else if (question.maxSelect && selected.length >= question.maxSelect) {
      // Evict oldest selection — keeps UX flowing
      next = [...selected.slice(1), optionId];
    } else {
      next = [...selected, optionId];
    }
    onChange(next);
  };

  const atMax = question.maxSelect ? selected.length >= question.maxSelect : false;

  return (
    <div className="space-y-3" role="group" aria-label={question.title[language]}>
      {question.options?.map((opt, index) => {
        const isSelected = selected.includes(opt.id);
        const isDisabled = atMax && !isSelected;

        return (
          <motion.button
            key={opt.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => handleToggle(opt.id)}
            role="checkbox"
            aria-checked={isSelected}
            aria-disabled={isDisabled}
            className={`
              group w-full text-left px-5 py-4 rounded-2xl border-2
              transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30
              ${isSelected
                ? 'border-primary bg-primary/8 text-primary shadow-md shadow-primary/10'
                : isDisabled
                  ? 'border-border/40 bg-card/30 text-muted-foreground/50 cursor-not-allowed'
                  : 'border-border bg-card/50 text-foreground hover:border-primary/40 hover:bg-card hover:shadow-sm'
              }
            `}
          >
            <div className="flex items-center gap-4">
              {/* Checkbox indicator */}
              <div className={`
                w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center
                transition-all duration-300
                ${isSelected
                  ? 'border-primary bg-primary'
                  : isDisabled
                    ? 'border-muted-foreground/30'
                    : 'border-muted-foreground/50 group-hover:border-primary/50'
                }
              `}>
                {isSelected && (
                  <motion.svg
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="w-3 h-3 text-white"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 6l3 3 5-5" />
                  </motion.svg>
                )}
              </div>

              <span className="text-base md:text-lg font-light leading-snug">
                {opt.label[language]}
              </span>
            </div>
          </motion.button>
        );
      })}

      {/* Selection counter */}
      {question.maxSelect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between pt-1 px-1"
        >
          <p className="text-sm text-muted-foreground">
            {language === 'en'
              ? `Select up to ${question.maxSelect}`
              : `Chagua hadi ${question.maxSelect}`}
          </p>
          <p className={`text-sm font-medium transition-colors ${
            atMax ? 'text-primary' : 'text-muted-foreground'
          }`}>
            {selected.length}/{question.maxSelect}
          </p>
        </motion.div>
      )}
    </div>
  );
};
