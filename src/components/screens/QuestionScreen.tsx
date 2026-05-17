import React from 'react';
import { useSurvey } from '../../context/SurveyContext';
import { questions } from '../../data/questions';
import { motion } from 'framer-motion';
import { QuestionRenderer } from '../questions/QuestionRenderer';

export const QuestionScreen: React.FC = () => {
  const { step } = useSurvey();
  
  const questionIndex = step - 3;
  const question = questions[questionIndex];
  
  if (!question) return null;

  return (
    <motion.div 
      key={question.id} // Important for re-mounting and triggering animations on step change
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-[60vh] max-w-2xl mx-auto px-6 w-full"
    >
      <QuestionRenderer question={question} />
    </motion.div>
  );
};
