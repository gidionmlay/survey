import { motion } from 'framer-motion';
import { ArrowRight, Activity } from 'lucide-react';

interface IntroSlideProps {
  onStart: () => void;
}

export function IntroSlide({ onStart }: IntroSlideProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      {/* Subtle modern pattern background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(var(--foreground) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Central content */}
      <div className="relative z-10 flex max-w-2xl flex-col items-center gap-10 px-8 text-center">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5"
        >
          <Activity className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">Research Study</span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4"
        >
          <h1 className="text-6xl font-bold tracking-tight text-foreground leading-[1.1] sm:text-7xl">
            The Money<br />Rhythm Study
          </h1>
          <p className="text-xl font-medium text-muted-foreground">
            Understanding How People Experience the Flow of Money
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg text-base leading-relaxed text-muted-foreground/90"
        >
          This short study explores the emotional, behavioral, and rhythmic patterns in how people relate to money. 
          Your honest responses will help us build a deeper understanding of financial wellbeing.
          <br /><br />
          <span className="font-semibold text-foreground">Takes about 5–7 minutes. All responses are anonymous.</span>
        </motion.p>

        {/* CTA */}
        <motion.button
          onClick={onStart}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="group mt-4 flex items-center gap-3 rounded-full bg-primary px-10 py-4 text-base font-bold text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:shadow-primary/40 hover:bg-primary/95"
        >
          Begin the Study
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <ArrowRight className="h-5 w-5" />
          </motion.span>
        </motion.button>

        {/* Subtle note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-xs font-medium text-muted-foreground/60"
        >
          10 thoughtful questions · No right or wrong answers
        </motion.p>
      </div>
    </div>
  );
}
