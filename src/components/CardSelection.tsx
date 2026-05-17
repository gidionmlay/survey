import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardOption {
  id: string;
  title: string;
  description?: string;
  icon?: string;
}

interface CardSelectionProps {
  options: CardOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function CardSelection({ options, selectedId, onSelect }: CardSelectionProps) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        return (
          <motion.button
            key={option.id}
            variants={cardVariants}
            onClick={() => onSelect(option.id)}
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              'group relative flex flex-col items-start gap-2 rounded-2xl border-2 p-5 text-left',
              'transition-all duration-200 bg-white ring-offset-background',
              isSelected
                ? 'border-primary bg-primary/5 shadow-[0_0_24px_rgba(255,91,4,0.15)] ring-2 ring-primary ring-offset-2'
                : 'border-border hover:border-primary/40 shadow-sm hover:shadow-md'
            )}
          >
            {option.icon && (
              <span className="text-4xl leading-none">{option.icon}</span>
            )}
            <div>
              <p className={cn(
                'font-semibold text-base leading-tight',
                isSelected ? 'text-primary' : 'text-foreground'
              )}>
                {option.title}
              </p>
              {option.description && (
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {option.description}
                </p>
              )}
            </div>
            {/* Selection indicator */}
            {isSelected && (
              <motion.div
                layoutId="card-selection-ring"
                className="absolute inset-0 rounded-2xl border-2 border-primary"
                initial={false}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
