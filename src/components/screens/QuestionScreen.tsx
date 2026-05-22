import { useSurvey } from '../../context/SurveyContext';
import { questions } from '../../data/questions';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionRenderer } from '../questions/QuestionRenderer';

export const QuestionScreen: React.FC = () => {
  const { step } = useSurvey();

  const questionIndex = step - 3;
  const question = questions[questionIndex];

  if (!question) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -24 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        className="flex flex-col w-full max-w-2xl mx-auto px-2 md:px-6"
      >
        <QuestionRenderer question={question} />
      </motion.div>
    </AnimatePresence>
  );
};
