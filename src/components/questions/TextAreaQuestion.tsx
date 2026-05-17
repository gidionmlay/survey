import React from 'react';

export const TextAreaQuestion = ({ localText, setLocalText }: any) => {
  return (
    <textarea
      value={localText}
      onChange={(e) => setLocalText(e.target.value)}
      className="w-full h-40 p-5 bg-card/50 border border-border rounded-2xl focus:outline-none focus:border-primary resize-none transition-colors text-lg"
      placeholder="..."
      aria-label="Your answer"
    />
  );
};
