import React, { useEffect, useState } from 'react';
import { Clock, Flame } from 'lucide-react';

interface UrgencyBarProps {
  onCtaClick?: () => void;
}

export const UrgencyBar: React.FC<UrgencyBarProps> = ({ onCtaClick }) => {
  // 5 minutes and 47 seconds countdown default (like the user reference image)
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const saved = localStorage.getItem('dolls_promo_timer');
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    return 347; // 05:47
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          return 347; // Loop back or keep at brief urgency
        }
        const next = prev - 1;
        try {
          localStorage.setItem('dolls_promo_timer', next.toString());
        } catch {
          // ignore
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div
      role="banner"
      className="sticky top-0 z-40 bg-gradient-to-r from-[#FF007A] via-[#E11D74] to-[#C026D3] text-white shadow-sm transition-all"
    >
      <div className="max-w-5xl mx-auto px-4 py-2 sm:py-2.5 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold tracking-wide">
        <Flame className="w-4 h-4 animate-bounce text-yellow-300" fill="currentColor" />
        <span className="uppercase text-[11px] sm:text-xs tracking-wider">A PROMOÇÃO TERMINA EM</span>
        <div className="flex items-center gap-1 bg-black/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/20 font-mono font-extrabold text-yellow-200">
          <Clock className="w-3.5 h-3.5 text-yellow-300" />
          <span className="tabular-nums">{formattedTime}</span>
        </div>
        {onCtaClick && (
          <button
            onClick={onCtaClick}
            className="hidden sm:inline-flex items-center text-xs underline font-semibold text-white/90 hover:text-white ml-2 cursor-pointer"
          >
            Aproveitar oferta &rarr;
          </button>
        )}
      </div>
    </div>
  );
};
