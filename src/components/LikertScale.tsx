import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LikertScaleProps {
  minLabel?: string;
  maxLabel?: string;
  value: number | null;
  onChange: (value: number) => void;
}

const SCALE = [1, 2, 3, 4, 5];

export function LikertScale({ minLabel = 'Not at all', maxLabel = 'Absolutely', value, onChange }: LikertScaleProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        {SCALE.map((n) => {
          const isSelected = value === n;
          return (
            <motion.button
              key={n}
              onClick={() => onChange(n)}
              whileHover={{ scale: 1.12, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'relative flex h-16 w-16 flex-1 flex-col items-center justify-center rounded-2xl border-2',
                'text-lg font-bold transition-all duration-200 glass-card',
                isSelected
                  ? 'border-primary bg-primary/15 text-primary shadow-[0_0_20px_rgba(139,92,246,0.25)] scale-105'
                  : 'border-border text-muted-foreground hover:border-primary/40 hover:text-primary'
              )}
            >
              <span>{n}</span>
              {isSelected && (
                <motion.div
                  layoutId="likert-indicator"
                  className="absolute inset-0 rounded-2xl bg-primary/10"
                />
              )}
            </motion.button>
          );
        })}
      </div>
      <div className="flex justify-between px-1">
        <span className="text-xs text-muted-foreground font-medium">{minLabel}</span>
        <span className="text-xs text-muted-foreground font-medium">{maxLabel}</span>
      </div>
    </div>
  );
}
