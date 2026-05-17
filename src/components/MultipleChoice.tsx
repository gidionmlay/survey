import { motion, type Variants } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
  id: string;
  label: string;
  emoji?: string;
}

interface MultipleChoiceProps {
  options: Option[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function MultipleChoice({ options, selectedId, onSelect }: MultipleChoiceProps) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {options.map((option, index) => {
        const isSelected = selectedId === option.id;
        return (
          <motion.button
            key={option.id}
            variants={itemVariants}
            onClick={() => onSelect(option.id)}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'group relative flex items-center gap-4 rounded-2xl border-2 p-4 text-left',
              'transition-all duration-200',
              'bg-white ring-offset-background',
              isSelected
                ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 ring-2 ring-primary ring-offset-2'
                : 'border-border hover:border-primary/40 hover:shadow-sm'
            )}
          >
            {/* Keyboard hint */}
            <div className={cn(
              'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums',
              'transition-all duration-200',
              isSelected
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground group-hover:bg-primary/15 group-hover:text-primary'
            )}>
              {isSelected ? <Check className="h-4 w-4" /> : String.fromCharCode(65 + index)}
            </div>
            {option.emoji && <span className="text-2xl">{option.emoji}</span>}
            <span className={cn(
              'text-sm font-medium leading-snug',
              isSelected ? 'text-primary' : 'text-foreground'
            )}>
              {option.label}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
