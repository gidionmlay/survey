import React from 'react';

export const MultiChoiceQuestion = ({ question, currentAnswer, language, onChange }: any) => {
  const handleToggle = (optionId: string) => {
    const current = Array.isArray(currentAnswer) ? currentAnswer : [];
    let newSelection;
    if (current.includes(optionId)) {
      newSelection = current.filter(id => id !== optionId);
    } else {
      if (question.maxSelect && current.length >= question.maxSelect) {
        newSelection = [...current.slice(1), optionId];
      } else {
        newSelection = [...current, optionId];
      }
    }
    onChange(newSelection);
  };

  return (
    <div className="space-y-3" role="group" aria-label={question.title[language]}>
      {question.options?.map((opt: any) => {
        const isSelected = Array.isArray(currentAnswer) && currentAnswer.includes(opt.id);
        return (
          <button
            key={opt.id}
            onClick={() => handleToggle(opt.id)}
            role="checkbox"
            aria-checked={isSelected}
            className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              isSelected
                ? 'border-primary bg-primary/5 text-primary shadow-sm'
                : 'border-border bg-card/50 text-foreground hover:border-primary/50 hover:bg-card'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
              }`}>
                {isSelected && <div className="w-3 h-3 bg-white" style={{ clipPath: 'polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)' }} />}
              </div>
              {opt.label[language]}
            </div>
          </button>
        );
      })}
      {question.maxSelect && (
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Select up to {question.maxSelect}
        </p>
      )}
    </div>
  );
};
