import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BooleanTextQuestion = ({ question, currentAnswer, language, localText, setLocalText, onChange }: any) => {
  return (
    <div className="space-y-8">
      <div className="flex gap-4" role="radiogroup" aria-label={question.title[language]}>
        {question.options?.map((opt: any) => (
          <button
            key={opt.id}
            onClick={() => onChange({ ...currentAnswer, choice: opt.id })}
            role="radio"
            aria-checked={currentAnswer?.choice === opt.id}
            className={`flex-1 p-5 rounded-2xl border transition-all duration-300 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              currentAnswer?.choice === opt.id
                ? 'border-primary bg-primary/5 text-primary shadow-sm'
                : 'border-border bg-card/50 text-foreground hover:border-primary/50'
            }`}
          >
            {opt.label[language]}
          </button>
        ))}
      </div>
      
      <AnimatePresence>
        {currentAnswer?.choice === 'yes' && question.followUp && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <label htmlFor={`followup-${question.id}`} className="block text-lg text-foreground font-light">
              {question.followUp[language]}
            </label>
            <textarea
              id={`followup-${question.id}`}
              value={localText}
              onChange={(e) => setLocalText(e.target.value)}
              className="w-full h-32 p-4 bg-card/50 border border-border rounded-2xl focus:outline-none focus:border-primary resize-none transition-colors"
              placeholder="..."
              aria-label={question.followUp[language]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
