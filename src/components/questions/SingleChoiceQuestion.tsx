import React from 'react';

export const SingleChoiceQuestion = ({ question, currentAnswer, language, onChange }: any) => {
  return (
    <div className="space-y-3" role="radiogroup" aria-label={question.title[language]}>
      {question.options?.map((opt: any) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          role="radio"
          aria-checked={currentAnswer === opt.id}
          className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            currentAnswer === opt.id
              ? 'border-primary bg-primary/5 text-primary shadow-sm'
              : 'border-border bg-card/50 text-foreground hover:border-primary/50 hover:bg-card'
          }`}
        >
          {opt.label[language]}
        </button>
      ))}
    </div>
  );
};
