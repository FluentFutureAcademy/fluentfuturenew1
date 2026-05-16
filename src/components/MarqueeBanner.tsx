import { useState } from 'react';
import './marquee-banner.css';

export default function MarqueeBanner() {
  const [isHovered, setIsHovered] = useState(false);

  const marqueeText = '🌟 Open Enrollment Starts June 1st — Spanish for Travel & Business   •   Limited to 6-13 Students Per Class   •   3 Weeks | $399   •   AI-Powered Learning + Expert Human Coaching   •   Secure Your Spot Now   • 🇪🇸';

  return (
    <div
      className={`marquee-wrapper ${isHovered ? 'paused' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="marquee-container">
        <div className="marquee-track">
          <div className="marquee-item">{marqueeText}</div>
          <div className="marquee-item">{marqueeText}</div>
        </div>
      </div>
    </div>
  );
}
