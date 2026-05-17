import { motion, type Variants } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
  id: string;
  label: string;
  emoji?: string;
}

interface MultipleSelectProps {
  options: Option[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function MultipleSelect({ options, selectedIds, onToggle }: MultipleSelectProps) {
  return (
    <motion.div
      className="flex flex-col gap-2.5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {options.map((option) => {
        const isSelected = selectedIds.includes(option.id);
        return (
          <motion.button
            key={option.id}
            variants={itemVariants}
            onClick={() => onToggle(option.id)}
            whileHover={{ scale: 1.01, x: 4 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
              'flex items-center gap-4 rounded-2xl border-2 p-4 text-left',
              'transition-all duration-200 bg-white ring-offset-background',
              isSelected
                ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 ring-2 ring-primary ring-offset-2'
                : 'border-border hover:border-primary/40 hover:shadow-sm'
            )}
          >
            <div className={cn(
              'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2',
              'transition-all duration-200',
              isSelected
                ? 'border-primary bg-primary text-white'
                : 'border-muted-foreground/40 bg-transparent'
            )}>
              {isSelected && <Check className="h-3.5 w-3.5" />}
            </div>
            {option.emoji && <span className="text-xl">{option.emoji}</span>}
            <span className={cn(
              'text-sm font-medium',
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
