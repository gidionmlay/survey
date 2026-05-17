import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { questions } from '../data/questions';

type Language = 'en' | 'sw';

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
  responses: Record<string, any>;
  setResponse: (questionId: string, answer: any) => void;
  totalSteps: number;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [step, setStepState] = useState(0);
  const [firstName, setFirstNameState] = useState('');
  const [email, setEmailState] = useState('');
  const [responses, setResponsesState] = useState<Record<string, any>>({});

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cadence_survey_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.language) setLanguageState(parsed.language);
        if (parsed.step !== undefined) setStepState(parsed.step);
        if (parsed.firstName) setFirstNameState(parsed.firstName);
        if (parsed.email) setEmailState(parsed.email);
        if (parsed.responses) setResponsesState(parsed.responses);
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
  const setEmail = (email: string) => setEmailState(email);
  const setResponse = (id: string, answer: any) => {
    setResponsesState(prev => ({ ...prev, [id]: answer }));
  };

  // 0: Welcome, 1: Name, 2: Email, 3-18: Questions, 19: Completion
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
