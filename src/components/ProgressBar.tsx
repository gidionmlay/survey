import { useSurvey } from '../context/SurveyContext';
import { translations } from '../i18n/translations';
import { questions } from '../data/questions';
import type { SurveyStage } from '../types/survey';
import { motion, AnimatePresence } from 'framer-motion';

// New stage names aligned with the updated type system
const STAGE_KEYS: ReadonlyArray<SurveyStage> = [
  'awareness',
  'reflection',
  'exploration',
  'vision',
];

function isSurveyStage(value: string): value is SurveyStage {
  return (STAGE_KEYS as readonly string[]).includes(value);
}

// Dot colors per stage for the stage indicator pips
const STAGE_COLORS: Record<SurveyStage, string> = {
  awareness:   'bg-indigo-400',
  reflection:  'bg-teal-400',
  exploration: 'bg-blue-400',
  vision:      'bg-amber-400',
};

const STAGE_TEXT_COLORS: Record<SurveyStage, string> = {
  awareness:   'text-indigo-500',
  reflection:  'text-teal-600',
  exploration: 'text-blue-500',
  vision:      'text-amber-500',
};

export const ProgressBar: React.FC = () => {
  const { step, language } = useSurvey();

  // Only render during the question phase
  if (step < 3 || step > 2 + questions.length) return null;

  const questionIndex = step - 3;
  const currentQuestion = questions[questionIndex];
  const rawStage = currentQuestion?.stage ?? 'awareness';
  const stage: SurveyStage = isSurveyStage(rawStage) ? rawStage : 'awareness';
  const stageText = translations[language].progress[stage];

  // Progress excludes transitions for cleaner percentage feel
  const answerableQuestions = questions.filter(q => q.type !== 'transition');
  const answeredSoFar = questions
    .slice(0, questionIndex)
    .filter(q => q.type !== 'transition').length;
  const progressPercent = (answeredSoFar / answerableQuestions.length) * 100;

  // Stage pip position (which of the 4 stages is active)
  const stageIndex = STAGE_KEYS.indexOf(stage);

  return (
    <div className="w-full max-w-2xl mx-auto mb-10 px-2 md:px-0">
      {/* Stage label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stageText}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.35 }}
          className={`text-xs font-semibold tracking-widest uppercase mb-3 ${STAGE_TEXT_COLORS[stage]}`}
        >
          {stageText}
        </motion.div>
      </AnimatePresence>

      {/* Progress track */}
      <div className="h-1 w-full bg-secondary/40 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${STAGE_COLORS[stage]}`}
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
      </div>

      {/* Stage pips */}
      <div className="flex justify-between mt-3 px-0.5">
        {STAGE_KEYS.map((s, i) => {
          const isActive  = i === stageIndex;
          const isDone    = i < stageIndex;
          return (
            <div
              key={s}
              className={`
                w-1.5 h-1.5 rounded-full transition-all duration-500
                ${isDone    ? STAGE_COLORS[s] + ' opacity-70' : ''}
                ${isActive  ? STAGE_COLORS[stage] + ' scale-150 shadow-sm shadow-current' : ''}
                ${!isDone && !isActive ? 'bg-secondary/50' : ''}
              `}
            />
          );
        })}
      </div>
    </div>
  );
};
