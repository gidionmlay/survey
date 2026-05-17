import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SurveySlideProps {
  children: React.ReactNode;
  className?: string;
}

export function SurveySlide({ children, className }: SurveySlideProps) {
  return (
    <section
      className={cn(
        'relative flex h-screen w-screen flex-shrink-0 items-center justify-center overflow-hidden',
        className
      )}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-background dark:from-indigo-950/20 dark:to-background" />

      {/* Floating decoration */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute right-0 top-0 h-72 w-72 -translate-y-1/4 translate-x-1/4 rounded-full bg-purple-200/25 blur-3xl dark:bg-purple-900/10" />
        <div className="absolute bottom-0 left-0 h-72 w-72 translate-y-1/4 -translate-x-1/4 rounded-full bg-indigo-200/25 blur-3xl dark:bg-indigo-900/10" />
      </div>

      {/* Content Layer */}
      <motion.div
        className="relative z-10 w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
