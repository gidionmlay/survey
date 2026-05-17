import React from 'react';
import { useSurvey } from '../../context/SurveyContext';
import { translations } from '../../i18n/translations';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
  const { language, nextStep } = useSurvey();
  const t = translations[language].welcome;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[70vh] max-w-2xl mx-auto px-6 text-center"
    >
      <h1 className="text-4xl md:text-5xl font-light text-accent mb-8 tracking-tight">
        {t.title}
      </h1>
      
      <div className="space-y-6 text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-12">
        {t.description.split('\n\n').map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      <button
        onClick={nextStep}
        className="group relative inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2">
          {t.begin}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </button>
    </motion.div>
  );
};
