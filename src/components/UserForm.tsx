import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, User, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserFormProps {
  onBack: () => void;
  onComplete: (data: { name: string; email: string }) => void;
}

export function UserForm({ onBack, onComplete }: UserFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please fill in both name and email.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    onComplete({ name, email });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4 sm:px-8">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(var(--foreground) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative z-10 w-full max-w-md"
      >
        <button
          onClick={onBack}
          className="group mb-8 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Intro
        </button>

        <div className="flex flex-col gap-2 mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Tell us about yourself</h2>
          <p className="text-muted-foreground">Before we begin, we just need a few details to personalize your experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-foreground">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/50 transition-colors group-focus-within:text-primary" />
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                className={cn(
                  "h-12 w-full rounded-xl border-2 bg-white pl-10 pr-4 text-base transition-all focus:outline-none focus:ring-4 focus:ring-primary/10",
                  error && !name.trim() ? "border-red-500/50" : "border-border focus:border-primary"
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-foreground">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/50 transition-colors group-focus-within:text-primary" />
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className={cn(
                  "h-12 w-full rounded-xl border-2 bg-white pl-10 pr-4 text-base transition-all focus:outline-none focus:ring-4 focus:ring-primary/10",
                  error && (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ? "border-red-500/50" : "border-border focus:border-primary"
                )}
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs font-semibold text-red-500"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-base font-bold text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:bg-primary/95 hover:shadow-primary/30"
          >
            Start the Survey
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground/60">
          Your information is stored securely and used only for the purpose of this study.
        </p>
      </motion.div>
    </div>
  );
}
