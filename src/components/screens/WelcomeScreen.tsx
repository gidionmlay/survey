import { useSurvey } from '../../context/SurveyContext';
import { translations } from '../../i18n/translations';
import { motion } from 'framer-motion';

export const WelcomeScreen: React.FC = () => {
  const { language, nextStep } = useSurvey();
  const t = translations[language].welcome;

  const paragraphs = t.description.split('\n\n');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center min-h-[75vh] max-w-2xl mx-auto px-6 md:px-10 py-10 text-center rounded-3xl bg-primary/25 dark:bg-primary/10 border border-primary/50 dark:border-primary/20 shadow-sm"
    >
      {/* Wordmark / logo area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-2"
      >
        <h1 className="text-4xl md:text-6xl font-light text-foreground tracking-tight leading-tight">
          {t.title}
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="text-sm text-muted-foreground/70 font-light mb-10 tracking-wide"
      >
        {t.subtitle}
      </motion.p>

      {/* Description paragraphs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="space-y-4 text-base md:text-lg text-muted-foreground font-light leading-relaxed mb-12 max-w-lg"
      >
        {paragraphs.map((para, idx) => (
          <p key={idx} className={idx === paragraphs.length - 1 ? 'italic text-sm text-muted-foreground/80' : ''}>
            {para}
          </p>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="flex flex-col items-center gap-4"
      >
        <button
          onClick={nextStep}
          className="
            group relative inline-flex items-center justify-center
            px-10 py-4 bg-energy text-energy-foreground rounded-full
            text-base font-semibold tracking-wide
            transition-all duration-300
            hover:bg-energy/90 hover:shadow-xl hover:shadow-energy/30
            focus:outline-none focus-visible:ring-4 focus-visible:ring-energy/50
            overflow-hidden
          "
        >
          <span className="relative z-10 flex items-center gap-3">
            {t.begin}
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </button>

        {/* Tagline / reassurance */}
        <p className="text-xs text-muted-foreground/60 font-light">
          {t.tagline}
        </p>
      </motion.div>
    </motion.div>
  );
};
