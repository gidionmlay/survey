import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, AlertCircle, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompletionSlideProps {
  onFinish: () => void;
  userData: { name: string; email: string };
  answers: Record<string, unknown>;
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export function CompletionSlide({ onFinish, userData, answers }: CompletionSlideProps) {
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    setStatus('submitting');
    setErrorMessage('');

    // Helper: join arrays for multi-select answers
    const format = (val: unknown) =>
      Array.isArray(val) ? (val as string[]).join(', ') : String(val ?? '');

    // Human-readable timestamp in local timezone
    const formattedTimestamp = new Date().toLocaleString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // Map answers to EXACT Google Sheet column headers
    const payload = {
      data: [
        {
          Timestamp: formattedTimestamp,
          Name: userData.name,
          Email: userData.email,
          Q1_FinancialFeeling: format(answers.q1),
          Q2_TrackingMethod: format(answers.q2),
          Q3_MoneyClarity: format(answers.q3),
          Q4_MoneyShock: format(answers.q4),
          Q5_Challenges: format(answers.q5),
          Q6_PeaceOfMind: format(answers.q6),
          Q7_ChangeWish: format(answers.q7),
          Q8_CurrentTools: format(answers.q8),
          Q9_Frustration: format(answers.q9),
          Q10_StressLevel: format(answers.q10),
          Q11_AttemptImprove: format(answers.q11),
          Q12_MethodsTried: format(answers.q12),
          Q13_DesiredFeatures: format(answers.q13),
          Q14_Likelihood: format(answers.q14),
          Q15_LifeChange: format(answers.q15),
          FinalReflection: format(answers.finalReflection),
        },
      ],
    };

    // Debug: log the payload before sending
    console.log('📊 Survey Payload:', JSON.stringify(payload, null, 2));

    try {
      const response = await fetch('https://sheetdb.io/api/v1/rcx9ed65nu99w', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit survey. Please try again.');
      }

      setStatus('success');
    } catch (err) {
      console.error('Submission Error:', err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background Accent */}
      <motion.div
        className="absolute inset-0 z-0 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5 }}
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, var(--accent) 0%, transparent 65%)',
        }}
      />

      {/* Content */}
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 flex max-w-xl flex-col items-center gap-8 px-8 text-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-xl shadow-green-500/20 text-white">
              <CheckCircle2 className="h-10 w-10" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-5xl font-bold tracking-tight text-foreground leading-tight">All Done!</h2>
              <p className="text-xl font-medium text-muted-foreground">Your responses have been securely saved.</p>
            </div>
            <p className="text-base text-muted-foreground/90">
              Thank you for contributing to <strong>The Money Rhythm Study</strong>. Your insights are invaluable to our research.
            </p>
            <motion.button
              onClick={onFinish}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-primary px-10 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/95"
            >
              Return Home
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="idle-error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 flex max-w-xl flex-col items-center gap-8 px-8 text-center"
          >
            {status === 'error' ? (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500 shadow-xl shadow-red-500/20 text-white">
                <AlertCircle className="h-10 w-10" strokeWidth={2} />
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 15 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-accent shadow-xl shadow-accent/20"
              >
                <CheckCircle2 className="h-10 w-10 text-accent-foreground" strokeWidth={2} />
              </motion.div>
            )}

            <div className="flex flex-col gap-4">
              <h2 className="text-5xl font-bold tracking-tight text-foreground leading-tight">
                {status === 'error' ? 'Submission Failed' : 'Ready to Finish?'}
              </h2>
              <p className="text-xl font-semibold text-muted-foreground">
                {status === 'error' ? errorMessage : 'Your voice matters in this research.'}
              </p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-sm text-base leading-relaxed text-muted-foreground/90"
            >
              {status === 'error' 
                ? 'We encountered an error saving your responses. Please check your connection and try again.'
                : 'Your responses help us better understand how people experience the rhythm of money.'}
            </motion.p>

            <div className="flex flex-col items-center gap-4 w-full">
              <motion.button
                onClick={handleSubmit}
                disabled={status === 'submitting'}
                whileHover={status !== 'submitting' ? { scale: 1.04, y: -2 } : {}}
                whileTap={status !== 'submitting' ? { scale: 0.97 } : {}}
                className={cn(
                  "flex items-center gap-3 rounded-full px-12 py-4 text-base font-bold shadow-lg transition-all",
                  status === 'error'
                    ? "bg-red-500 text-white hover:bg-red-600 shadow-red-500/20"
                    : "bg-primary text-primary-foreground hover:bg-primary/95 shadow-primary/20"
                )}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : status === 'error' ? (
                  <>
                    <RefreshCcw className="h-5 w-5" />
                    Try Again
                  </>
                ) : (
                  'Complete & Finish Survey'
                )}
              </motion.button>
              
              {status === 'error' && (
                <button 
                  onClick={onFinish}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Discard and Exit
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
