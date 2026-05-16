import { Link } from 'react-router-dom';
import { useConsentTimer } from './ConsentTimerContext';

export default function TimerBar() {
  const { isActive, countdown } = useConsentTimer();

  if (!isActive) return null;

  const expired = countdown === 0;

  return (
    <div className={`fixed top-0 left-0 right-0 z-[70] bg-[#0c1a3a] border-b border-emerald-500/20 ${expired ? 'animate-pulse' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
        <span className="text-blue-100/80 text-sm font-medium hidden sm:block">
          {expired ? 'Return to complete your enrollment' : 'Your enrollment session is active'}
        </span>
        <span className="text-blue-100/80 text-sm font-medium sm:hidden">
          {expired ? 'Complete enrollment' : 'Session active'}
        </span>

        <span className="text-emerald-400 font-bold text-lg tabular-nums">
          {expired ? '00:00' : `00:${countdown.toString().padStart(2, '0')}`}
        </span>

        <Link
          to="/programs/spanish-travel-business"
          className="px-4 py-1.5 bg-emerald-600 text-white text-sm font-semibold rounded-md hover:bg-emerald-700 transition-colors"
        >
          Return to Enrollment
        </Link>
      </div>
    </div>
  );
}
