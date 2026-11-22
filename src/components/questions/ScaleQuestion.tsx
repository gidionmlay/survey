import { motion } from 'framer-motion';
import type { Question, Language } from '../../types/survey';

interface Props {
  question: Question;
  currentAnswer: string | undefined;
  language: Language;
  onChange: (value: string) => void;
}

export const ScaleQuestion = ({ question, currentAnswer, language, onChange }: Props) => {
  const scaleLabels = question.scaleLabels;

  return (
    <div className="w-full" role="radiogroup" aria-label={question.title[language]}>
      {/* Scale buttons */}
      <div className="flex items-end justify-between gap-2 md:gap-3 mb-6">
        {([1, 2, 3, 4, 5] as const).map((num) => {
          const isSelected = currentAnswer === num.toString();
          return (
            <button
              key={num}
              onClick={() => onChange(num.toString())}
              role="radio"
              aria-checked={isSelected}
              aria-label={scaleLabels ? scaleLabels[num][language] : `Rate ${num} out of 5`}
              className={`
                relative flex-1 flex flex-col items-center gap-2 pt-4 pb-3 rounded-2xl border-2
                transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary/40
                ${isSelected
                  ? 'border-secondary bg-primary/25 dark:bg-primary/15 shadow-lg shadow-secondary/15 scale-[1.04]'
                  : 'border-border bg-card/50 hover:border-secondary/60 hover:bg-card hover:scale-[1.02]'
                }
              `}
            >
              {/* Number badge */}
              <span className={`
                w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold
                transition-all duration-300
                ${isSelected
                  ? 'bg-secondary text-secondary-foreground shadow-md'
                  : 'bg-primary/35 dark:bg-white/10 text-muted-foreground'
                }
              `}>
                {num}
              </span>

              {/* Emotional label — shown on md+ or always for selected */}
              {scaleLabels && (
                <span className={`
                  text-center leading-tight transition-all duration-300 px-1
                  hidden md:block text-xs
                  ${isSelected ? 'text-secondary dark:text-primary font-medium' : 'text-muted-foreground'}
                `}>
                  {scaleLabels[num][language]}
                </span>
              )}

              {/* Selected indicator dot */}
              {isSelected && (
                <motion.div
                  layoutId="scale-indicator"
                  className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-energy rounded-full shadow-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile: show selected label below */}
      {scaleLabels && currentAnswer && (
        <motion.div
          key={currentAnswer}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden text-center text-sm text-secondary dark:text-primary font-medium py-2 px-4 bg-primary/25 dark:bg-primary/15 rounded-xl"
        >
          {scaleLabels[parseInt(currentAnswer) as 1 | 2 | 3 | 4 | 5][language]}
        </motion.div>
      )}

      {/* Scale anchors — fallback if no scaleLabels */}
      {!scaleLabels && (
        <div className="flex justify-between text-xs text-muted-foreground px-1 mt-2">
          <span>{language === 'en' ? 'Not at all' : 'Hata kidogo'}</span>
          <span>{language === 'en' ? 'Extremely' : 'Sana sana'}</span>
        </div>
      )}
    </div>
  );
};
