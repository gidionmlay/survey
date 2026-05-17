import React from 'react';
import { SurveyProvider, useSurvey } from './context/SurveyContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ProgressBar } from './components/ProgressBar';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { NameScreen } from './components/screens/NameScreen';
import { EmailScreen } from './components/screens/EmailScreen';
import { QuestionScreen } from './components/screens/QuestionScreen';
import { CompletionScreen } from './components/screens/CompletionScreen';
import { questions } from './data/questions';

const SurveyApp = () => {
  const { step } = useSurvey();

  const getStageTheme = () => {
    if (step < 3 || step >= 3 + questions.length) return 'bg-background';
    const stage = questions[step - 3].stage;
    switch (stage) {
      case 'understanding': return 'bg-indigo-50/40 dark:bg-indigo-950/20';
      case 'reflecting': return 'bg-teal-50/40 dark:bg-teal-950/20';
      case 'exploring': return 'bg-blue-50/40 dark:bg-blue-950/20';
      case 'imagining': return 'bg-amber-50/40 dark:bg-amber-950/20';
      default: return 'bg-background';
    }
  };

  const renderScreen = () => {
    if (step === 0) return <WelcomeScreen />;
    if (step === 1) return <NameScreen />;
    if (step === 2) return <EmailScreen />;
    if (step >= 3 && step < 3 + questions.length) return <QuestionScreen />;
    return <CompletionScreen />;
  };

  return (
    <div className={`min-h-screen text-foreground flex flex-col font-['Outfit'] transition-colors duration-1000 ${getStageTheme()}`}>
      <LanguageSwitcher />
      
      <main className="flex-1 flex flex-col pt-24 pb-12 px-4 md:px-8 max-w-4xl mx-auto w-full">
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
