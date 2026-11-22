import { useSurvey } from '../context/SurveyContext';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useSurvey();

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center bg-white/40 dark:bg-black/20 backdrop-blur-md rounded-full p-1 border border-white/20 shadow-sm">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'en'
            ? 'bg-white dark:bg-white/10 text-secondary dark:text-accent shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('sw')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'sw'
            ? 'bg-white dark:bg-white/10 text-secondary dark:text-accent shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        SW
      </button>
    </div>
  );
};
