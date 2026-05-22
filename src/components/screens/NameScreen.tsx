import { useState } from 'react';
import { useSurvey } from '../../context/SurveyContext';
import { translations } from '../../i18n/translations';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const NameScreen: React.FC = () => {
  const { language, firstName, setFirstName, nextStep } = useSurvey();
  const t = translations[language].nameScreen;
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (!firstName.trim()) {
      setError(true);
      return;
    }
    nextStep();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleNext();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col justify-center min-h-[60vh] max-w-xl mx-auto px-6"
    >
      <h2 className="text-3xl md:text-4xl font-light text-foreground mb-12">
        {t.question}
      </h2>
      
      <div className="relative mb-12">
        <input
          type="text"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            if (error) setError(false);
          }}
          onKeyDown={handleKeyDown}
          placeholder={t.placeholder}
          className={`w-full text-2xl bg-transparent border-b-2 py-4 focus:outline-none transition-colors duration-300 ${
            error ? 'border-destructive' : 'border-border focus:border-primary text-foreground'
          }`}
          autoFocus
        />
        {error && (
          <p className="absolute -bottom-6 left-0 text-sm text-destructive">
            Please enter your name
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="group inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full font-medium transition-all hover:bg-primary hover:text-white"
        >
          {t.next}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};
