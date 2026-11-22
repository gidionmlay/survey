import { SurveyProvider, useSurvey } from './context/SurveyContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ProgressBar } from './components/ProgressBar';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { NameScreen } from './components/screens/NameScreen';
import { EmailScreen } from './components/screens/EmailScreen';
import { QuestionScreen } from './components/screens/QuestionScreen';
import { CompletionScreen } from './components/screens/CompletionScreen';
import { questions } from './data/questions';
import type { SurveyStage } from './types/survey';

// Stage → background theme mapping aligned with brand palette
const STAGE_THEMES: Record<SurveyStage, string> = {
  awareness:   'bg-primary/20 dark:bg-primary/10',
  reflection:  'bg-secondary/10 dark:bg-secondary/15',
  exploration: 'bg-accent/25 dark:bg-accent/10',
  vision:      'bg-energy/20 dark:bg-energy/10',
};

function isSurveyStage(value: string): value is SurveyStage {
  const stages: SurveyStage[] = ['awareness', 'reflection', 'exploration', 'vision'];
  return stages.includes(value as SurveyStage);
}

const SurveyApp = () => {
  const { step } = useSurvey();

  const getStageTheme = (): string => {
    if (step < 3 || step >= 3 + questions.length) return 'bg-background';
    const rawStage = questions[step - 3].stage;
    const stage: SurveyStage = isSurveyStage(rawStage) ? rawStage : 'awareness';
    return STAGE_THEMES[stage];
  };

  const renderScreen = () => {
    if (step === 0) return <WelcomeScreen />;
    if (step === 1) return <NameScreen />;
    if (step === 2) return <EmailScreen />;
    if (step >= 3 && step < 3 + questions.length) return <QuestionScreen />;
    return <CompletionScreen />;
  };

  return (
    <div
      className={`
        min-h-screen text-foreground flex flex-col font-['Outfit',sans-serif]
        transition-colors duration-1000 ease-in-out
        ${getStageTheme()}
      `}
    >
      <LanguageSwitcher />

      <main className="flex-1 flex flex-col pt-20 pb-16 px-4 md:px-8 max-w-4xl mx-auto w-full">
        <ProgressBar />
        {renderScreen()}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <SurveyProvider>
      <SurveyApp />
    </SurveyProvider>
  );
}
