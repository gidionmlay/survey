import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { MultipleChoice } from './MultipleChoice';
import { MultipleSelect } from './MultipleSelect';
import { LikertScale } from './LikertScale';
import { OpenTextInput } from './OpenTextInput';
import { CardSelection } from './CardSelection';
import { cn } from '@/lib/utils';
import type { Question } from '@/data/questions';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  total: number;
  answer: unknown;
  onAnswer: (value: unknown) => void;
  onNext: () => void;
  isLast: boolean;
}

export function QuestionCard({
  question,
  currentIndex,
  total,
  answer,
  onAnswer,
  onNext,
  isLast,
}: QuestionCardProps) {
  const hasAnswer = answer !== null && answer !== '' && 
    !(Array.isArray(answer) && answer.length === 0);

  return (
    <div className="flex h-[100dvh] w-full flex-shrink-0 items-center justify-center px-4 sm:px-8">
      <div className="relative z-10 flex w-full max-w-3xl flex-col gap-10">
        {/* Top: Progress */}
        <ProgressBar current={currentIndex + 1} total={total} />

        {/* Question block */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -32 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold leading-[1.2] tracking-tight text-foreground sm:text-4xl text-balance">
                {question.question}
              </h2>
              {question.subtitle && (
                <p className="text-base text-muted-foreground font-medium">{question.subtitle}</p>
              )}
            </div>

            {/* Answer area */}
            <div>
              {question.type === 'multiple-choice' && (
                <MultipleChoice
                  options={question.options!}
                  selectedId={(answer as string) ?? null}
                  onSelect={(id) => onAnswer(id)}
                />
              )}
              {question.type === 'multiple-select' && (
                <MultipleSelect
                  options={question.options!}
                  selectedIds={(answer as string[]) ?? []}
                  onToggle={(id) => {
                    const current = (answer as string[]) ?? [];
                    const next = current.includes(id)
                      ? current.filter((x) => x !== id)
                      : [...current, id];
                    onAnswer(next);
                  }}
                />
              )}
              {question.type === 'likert' && (
                <LikertScale
                  value={(answer as number) ?? null}
                  onChange={(val) => onAnswer(val)}
                  minLabel={question.minLabel}
                  maxLabel={question.maxLabel}
                />
              )}
              {question.type === 'open-text' && (
                <OpenTextInput
                  value={(answer as string) ?? ''}
                  onChange={(val) => onAnswer(val)}
                  placeholder={question.placeholder}
                  multiline={question.multiline}
                />
              )}
              {question.type === 'card-selection' && (
                <CardSelection
                  options={question.cardOptions!}
                  selectedId={(answer as string) ?? null}
                  onSelect={(id) => onAnswer(id)}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom: Next button */}
        <div className="flex justify-end pt-4">
          <motion.button
            onClick={onNext}
            disabled={!hasAnswer}
            whileHover={hasAnswer ? { scale: 1.04, x: 4 } : {}}
            whileTap={hasAnswer ? { scale: 0.97 } : {}}
            className={cn(
              'group flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold',
              'transition-all duration-300',
              hasAnswer
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:bg-primary/95'
                : 'cursor-not-allowed bg-muted text-muted-foreground opacity-50'
            )}
          >
            {isLast ? 'Complete Survey' : 'Continue'}
            <ArrowRight className={cn(
              'h-4 w-4 transition-transform duration-300',
              hasAnswer ? 'group-hover:translate-x-1' : ''
            )} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
