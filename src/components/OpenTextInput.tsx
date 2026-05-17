import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OpenTextInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}

export function OpenTextInput({
  placeholder = 'Share your thoughts...',
  value,
  onChange,
  multiline = false,
}: OpenTextInputProps) {
  const baseClassName = cn(
    'w-full rounded-2xl border-2 border-border bg-white/50 dark:bg-black/20',
    'px-5 py-4 text-base font-medium text-foreground backdrop-blur-sm',
    'placeholder:text-muted-foreground/50',
    'transition-all duration-300 outline-none resize-none',
    'focus:border-primary focus:ring-4 focus:ring-primary/10',
    'focus:bg-white/80 dark:focus:bg-black/40',
    'hover:border-primary/40'
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={baseClassName}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClassName}
        />
      )}
      {/* Animated focus ring highlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-primary opacity-0"
        whileFocus={{ opacity: 1 }}
      />
    </motion.div>
  );
}
