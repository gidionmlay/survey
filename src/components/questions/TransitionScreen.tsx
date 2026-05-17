import React from 'react';
import { motion } from 'framer-motion';

export const TransitionScreen = ({ question, language }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[40vh] text-center"
      role="region"
      aria-label="Transition screen"
    >
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-8">
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed max-w-lg">
        {question.title?.[language] || question.text?.[language]}
      </p>
    </motion.div>
  );
};
