import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  message: string;
  visible?: boolean;
  variant?: 'calm' | 'reflective' | 'encouraging';
}

const variantStyles: Record<NonNullable<Props['variant']>, string> = {
  calm:         'text-muted-foreground/80 italic',
  reflective:   'text-accent/80 italic',
  encouraging:  'text-primary/80 italic',
};

/**
 * TransitionMessage — subtle emotional microcopy injected between questions.
 * Use sparingly for maximum impact: "Thank you for sharing that."
 */
export const TransitionMessage = ({ message, visible = true, variant = 'calm' }: Props) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`text-sm font-light text-center mb-6 ${variantStyles[variant]}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
};
