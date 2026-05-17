import React from 'react';
import { useSurvey } from '../context/SurveyContext';
import { translations } from '../i18n/translations';
import { questions } from '../data/questions';
import { motion, AnimatePresence } from 'framer-motion';

export const ProgressBar: React.FC = () => {
  const { step, language } = useSurvey();

  // If not in the questions phase, don't show the progress bar
  if (step < 3 || step > 2 + questions.length) {
    return null;
  }

  const questionIndex = step - 3;
  const currentQuestion = questions[questionIndex];
  const stage = currentQuestion?.stage || 'understanding';
  const stageText = translations[language].progress[stage];

  const progressPercent = ((questionIndex) / questions.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={stageText}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.4 }}
          className="text-center text-sm font-medium text-muted-foreground mb-4"
        >
          {stageText}
        </motion.div>
      </AnimatePresence>
      <div className="h-1 w-full bg-secondary/30 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};
