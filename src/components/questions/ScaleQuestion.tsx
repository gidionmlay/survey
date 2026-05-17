import React from 'react';

export const ScaleQuestion = ({ question, currentAnswer, onChange }: any) => {
  return (
    <div className="flex justify-between items-center px-4 py-8" role="radiogroup" aria-label="Rating scale from 1 to 5">
      {[1, 2, 3, 4, 5].map(num => (
        <button
          key={num}
          onClick={() => onChange(num.toString())}
          role="radio"
          aria-checked={currentAnswer === num.toString()}
          aria-label={`Rate ${num} out of 5`}
          className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-xl transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 ${
            currentAnswer === num.toString()
              ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30'
              : 'bg-card border border-border text-foreground hover:border-primary/50'
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  );
};
