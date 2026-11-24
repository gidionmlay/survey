import { motion } from 'framer-motion';
import type { Question, Language } from '../../types/survey';
import { useSurvey } from '../../context/SurveyContext';
import { personalizeText } from '../../lib/utils';

interface Props {
  question: Question;
  language: Language;
  onContinue: () => void;
}

const stageIcons: Record<string, React.ReactNode> = {
  reflection: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707" />
    </svg>
  ),
  exploration: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  vision: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

const stageColors: Record<string, string> = {
  reflection:  'text-secondary bg-primary/30 border-secondary/30 dark:text-primary dark:bg-primary/15',
  exploration: 'text-foreground bg-accent/40 border-accent/60 dark:text-accent dark:bg-accent/15',
  vision:      'text-foreground bg-energy/35 border-energy/60 dark:text-energy dark:bg-energy/15',
};

export const TransitionScreen = ({ question, language, onContinue }: Props) => {
  const { firstName } = useSurvey();
  const lines = personalizeText(question.title[language], firstName).split('\n\n');
  const colorClass = stageColors[question.stage] ?? 'text-secondary bg-primary/25 border-secondary/20';
  const icon = stageIcons[question.stage] ?? (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4"
      role="region"
      aria-label="Stage transition"
    >
      {/* Icon medallion */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5, type: 'spring', stiffness: 200 }}
        className={`w-20 h-20 rounded-full border flex items-center justify-center mb-10 ${colorClass}`}
      >
        {icon}
      </motion.div>

      {/* Text lines — each fades in sequentially */}
      <div className="space-y-5 max-w-lg">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.18, duration: 0.5, ease: 'easeOut' }}
            className={`leading-relaxed ${
              i === 0
                ? 'text-xl md:text-2xl font-light text-foreground'
                : 'text-base md:text-lg text-muted-foreground font-light'
            }`}
          >
            {line}
          </motion.p>
        ))}
      </div>

      {/* Continue nudge */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        onClick={onContinue}
        className="
          mt-12 inline-flex items-center gap-2 px-8 py-3.5
          bg-secondary/15 hover:bg-secondary hover:text-secondary-foreground text-secondary
          dark:bg-secondary/30 dark:text-primary dark:hover:bg-secondary dark:hover:text-secondary-foreground
          rounded-full font-medium text-base transition-all duration-300
          focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30
          group
        "
      >
        {language === 'en' ? 'Continue' : 'Endelea'}
        <svg
          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </motion.button>
    </motion.div>
  );
};
