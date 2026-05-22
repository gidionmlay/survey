import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { questions } from '../data/questions';
import type { Language } from '../types/survey';

interface SurveyContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  firstName: string;
  setFirstName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  responses: Record<string, unknown>;
  setResponse: (questionId: string, answer: unknown) => void;
  totalSteps: number;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [step, setStepState] = useState(0);
  const [firstName, setFirstNameState] = useState('');
  const [email, setEmailState] = useState('');
  const [responses, setResponsesState] = useState<Record<string, unknown>>({});

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cadence_survey_state');
    if (saved) {
      try {
        const parsed: unknown = JSON.parse(saved);
        if (
          parsed !== null &&
          typeof parsed === 'object' &&
          !Array.isArray(parsed)
        ) {
          const p = parsed as Record<string, unknown>;
          if (p.language === 'en' || p.language === 'sw') setLanguageState(p.language);
          if (typeof p.step === 'number') setStepState(p.step);
          if (typeof p.firstName === 'string') setFirstNameState(p.firstName);
          if (typeof p.email === 'string') setEmailState(p.email);
          if (p.responses !== null && typeof p.responses === 'object' && !Array.isArray(p.responses)) {
            setResponsesState(p.responses as Record<string, unknown>);
          }
        }
      } catch (e) {
        console.error("Failed to parse saved survey state", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('cadence_survey_state', JSON.stringify({
      language, step, firstName, email, responses
    }));
  }, [language, step, firstName, email, responses]);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const setStep = (s: number) => setStepState(s);
  const nextStep = () => setStepState(prev => prev + 1);
  const prevStep = () => setStepState(prev => Math.max(0, prev - 1));
  const setFirstName = (name: string) => setFirstNameState(name);
  const setEmail = (e: string) => setEmailState(e);
  const setResponse = (id: string, answer: unknown) => {
    setResponsesState(prev => ({ ...prev, [id]: answer }));
  };

  // 0: Welcome, 1: Name, 2: Email, 3-(3+N-1): Questions, (3+N): Completion
  // Stage names: awareness | reflection | exploration | vision
  const totalSteps = 3 + questions.length;

  return (
    <SurveyContext.Provider value={{
      language, setLanguage,
      step, nextStep, prevStep, setStep,
      firstName, setFirstName,
      email, setEmail,
      responses, setResponse,
      totalSteps
    }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) throw new Error("useSurvey must be used within a SurveyProvider");
  return context;
};
