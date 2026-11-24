import { useState } from 'react';
import { useSurvey } from '../../context/SurveyContext';
import { translations } from '../../i18n/translations';
import { personalizeText } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const EmailScreen: React.FC = () => {
  const { language, firstName, email, setEmail, nextStep } = useSurvey();
  const t = translations[language].emailScreen;
  const [error, setError] = useState('');

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleNext = () => {
    if (email && !isValidEmail(email)) {
      setError(language === 'en' ? 'Please enter a valid email address.' : 'Tafadhali weka barua pepe halali.');
      return;
    }
    setError('');
    nextStep();
  };
  
  const handleSkip = () => {
    setError('');
    nextStep();
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleNext();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col justify-center min-h-[60vh] max-w-xl mx-auto px-6"
    >
      <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
        {personalizeText(t.question, firstName)}
      </h2>
      <p className="text-muted-foreground mb-12 font-light">
        {t.helper}
      </p>
      
      <div className="relative mb-12">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          onKeyDown={handleKeyDown}
          placeholder={t.placeholder}
          className={`w-full text-2xl bg-transparent border-b-2 py-4 focus:outline-none transition-colors duration-300 text-foreground ${
            error ? 'border-amber-500/50 focus:border-amber-500' : 'border-border focus:border-secondary'
          }`}
          autoFocus
        />
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-8 left-0 text-sm text-amber-600/80 font-light"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handleSkip}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {t.skip}
        </button>
        <button
          onClick={handleNext}
          className="group inline-flex items-center gap-2 px-6 py-3 bg-secondary/15 text-secondary rounded-full font-medium transition-all hover:bg-secondary hover:text-secondary-foreground dark:bg-secondary/30 dark:text-primary dark:hover:bg-secondary dark:hover:text-secondary-foreground"
        >
          {t.next}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};
