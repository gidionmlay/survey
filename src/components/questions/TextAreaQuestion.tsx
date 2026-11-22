import type { Question, Language } from '../../types/survey';

interface Props {
  question: Question;
  language: Language;
  localText: string;
  setLocalText: (value: string) => void;
}

export const TextAreaQuestion = ({ question, language, localText, setLocalText }: Props) => {
  const placeholder = question.placeholder?.[language] ??
    (language === 'en' ? 'Your thoughts, in your own words...' : 'Mawazo yako, kwa maneno yako mwenyewe...');

  return (
    <div className="w-full">
      <textarea
        value={localText}
        onChange={(e) => setLocalText(e.target.value)}
        className="
          w-full min-h-[160px] p-5 bg-card/50 border-2 border-border rounded-2xl
          focus:outline-none focus:border-secondary focus:bg-card
          resize-none transition-all duration-300
          text-base md:text-lg font-light leading-relaxed text-foreground
          placeholder:text-muted-foreground/60
        "
        placeholder={placeholder}
        aria-label={question.title[language]}
        autoComplete="off"
        spellCheck
      />
      <p className="mt-3 text-xs text-muted-foreground/70 text-right">
        {language === 'en' ? 'Take as much space as you need' : 'Tumia nafasi unayohitaji'}
      </p>
    </div>
  );
};
