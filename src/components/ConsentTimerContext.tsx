import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface ConsentTimerState {
  isActive: boolean;
  countdown: number;
  consentAgreed: boolean;
  startSession: () => void;
  endSession: () => void;
  setConsentAgreed: (agreed: boolean) => void;
}

const ConsentTimerContext = createContext<ConsentTimerState | null>(null);

export function ConsentTimerProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const [consentAgreed, setConsentAgreed] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    setCountdown(15);
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  const startSession = useCallback(() => {
    setIsActive(true);
    setCountdown(15);
    setConsentAgreed(false);
  }, []);

  const endSession = useCallback(() => {
    setIsActive(false);
    setCountdown(15);
    setConsentAgreed(false);
  }, []);

  return (
    <ConsentTimerContext.Provider value={{ isActive, countdown, consentAgreed, startSession, endSession, setConsentAgreed }}>
      {children}
    </ConsentTimerContext.Provider>
  );
}

export function useConsentTimer() {
  const ctx = useContext(ConsentTimerContext);
  if (!ctx) throw new Error('useConsentTimer must be used within ConsentTimerProvider');
  return ctx;
}
