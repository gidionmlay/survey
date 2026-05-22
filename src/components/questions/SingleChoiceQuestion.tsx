import { motion } from 'framer-motion';
import type { Question, Language } from '../../types/survey';

interface Props {
  question: Question;
  currentAnswer: string | undefined;
  language: Language;
  onChange: (value: string) => void;
}

export const SingleChoiceQuestion = ({ question, currentAnswer, language, onChange }: Props) => {
  return (
    <div className="space-y-3" role="radiogroup" aria-label={question.title[language]}>
      {question.options?.map((opt, index) => {
        const isSelected = currentAnswer === opt.id;
        return (
          <motion.button
            key={opt.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => onChange(opt.id)}
            role="radio"
            aria-checked={isSelected}
            className={`
              group w-full text-left px-5 py-4 rounded-2xl border-2
              transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30
              ${isSelected
                ? 'border-primary bg-primary/8 text-primary shadow-md shadow-primary/10'
                : 'border-border bg-card/50 text-foreground hover:border-primary/40 hover:bg-card hover:shadow-sm'
              }
            `}
          >
            <div className="flex items-center gap-4">
              {/* Radio dot indicator */}
              <div className={`
                w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                transition-all duration-300
                ${isSelected
                  ? 'border-primary'
                  : 'border-muted-foreground/50 group-hover:border-primary/50'
                }
              `}>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="w-2.5 h-2.5 rounded-full bg-primary"
                  />
                )}
              </div>

              <span className="text-base md:text-lg font-light leading-snug">
                {opt.label[language]}
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};
