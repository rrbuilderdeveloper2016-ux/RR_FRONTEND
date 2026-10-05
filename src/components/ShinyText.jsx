import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
  useReducedMotion,
} from 'motion/react';

/**
 * ShinyText Component
 * Luxury animated metallic/light sweep text effect designed for high-end real-estate applications.
 *
 * @param {string} text - The promotional message to display
 * @param {number} speed - Sweep duration in seconds (default: 2.5)
 * @param {number} delay - Pause in seconds between sweep cycles (default: 1)
 * @param {string} color - Base text color (default: '#b5b5b5')
 * @param {string} shineColor - High-gleam metallic shine color (default: '#ffffff')
 * @param {number} spread - Gradient sweep spread percentage (default: 120)
 * @param {'left' | 'right'} direction - Sweep direction (default: 'left')
 * @param {boolean} yoyo - Alternates direction back and forth (default: false)
 * @param {boolean} pauseOnHover - Pauses animation while mouse hovers (default: false)
 * @param {boolean} disabled - Disables animation while keeping text visible (default: false)
 * @param {string} className - Additional CSS classes
 * @param {object} style - Additional inline styles
 * @param {React.ReactNode} children - Optional React children override
 */
export function ShinyText({
  text = '★ Special Complimentary Offer — Free Designer Modular Kitchen Included',
  speed = 2.5,
  delay = 1,
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  direction = 'left',
  yoyo = false,
  pauseOnHover = false,
  disabled = false,
  className = '',
  style = {},
  children,
}) {
  const prefersReduced = useReducedMotion();
  const isReduced = disabled || prefersReduced;

  const [isHovered, setIsHovered] = useState(false);

  const halfSpread = spread / 2;
  const startPos = direction === 'left' ? 100 + halfSpread : -halfSpread;
  const endPos = direction === 'left' ? -halfSpread : 100 + halfSpread;

  const progress = useMotionValue(startPos);
  const elapsedRef = useRef(0);
  const cycleCountRef = useRef(0);

  useAnimationFrame((_, delta) => {
    if (isReduced) return;
    if (pauseOnHover && isHovered) return;

    const speedMs = Math.max(speed, 0.1) * 1000;
    const delayMs = Math.max(delay, 0) * 1000;
    const totalCycleMs = speedMs + delayMs;

    elapsedRef.current += delta;

    const currentCycle = Math.floor(elapsedRef.current / totalCycleMs);
    const cycleTime = elapsedRef.current % totalCycleMs;

    // Track cycle changes for yoyo support
    cycleCountRef.current = currentCycle;

    if (cycleTime < speedMs) {
      // Active sweep phase
      const t = cycleTime / speedMs;

      const isReverse = yoyo && currentCycle % 2 === 1;
      const actualStart = isReverse ? endPos : startPos;
      const actualEnd = isReverse ? startPos : endPos;

      const currentPos = actualStart + t * (actualEnd - actualStart);
      progress.set(currentPos);
    } else {
      // Resting delay phase (park shine off-screen so text sits purely in base color)
      const isReverse = yoyo && currentCycle % 2 === 1;
      const parkedPos = isReverse ? startPos : endPos;
      progress.set(parkedPos);
    }
  });

  const backgroundImage = useTransform(progress, (pos) => {
    if (isReduced) return 'none';
    const pLeft = pos - halfSpread;
    const pRight = pos + halfSpread;
    return `linear-gradient(90deg, ${color} 0%, ${color} ${pLeft}%, ${shineColor} ${pos}%, ${color} ${pRight}%, ${color} 100%)`;
  });

  // Responsive hierarchy formatting: on mobile cleanly split into 2 lines, on desktop 1 line
  const renderContent = () => {
    if (children) return children;
    if (typeof text === 'string' && text.includes(' — ')) {
      const parts = text.split(' — ');
      return (
        <span className="inline-block max-w-full">
          <span className="inline-block">{parts[0]}</span>
          <span className="hidden sm:inline">&nbsp;—&nbsp;</span>
          <span className="block sm:inline-block font-extrabold">{parts.slice(1).join(' — ')}</span>
        </span>
      );
    }
    return text;
  };

  const content = renderContent();

  if (isReduced) {
    return (
      <span
        className={`inline-block text-center leading-relaxed max-w-full break-words ${className}`}
        style={{
          color,
          fontSize: 'clamp(0.85rem, 2vw, 1.15rem)',
          ...style,
        }}
      >
        {content}
      </span>
    );
  }

  return (
    <motion.span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-block text-center leading-relaxed max-w-full break-words ${className}`}
      style={{
        backgroundImage,
        WebkitBackgroundImage: backgroundImage,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        WebkitBoxDecorationBreak: 'clone',
        boxDecorationBreak: 'clone',
        fontSize: 'clamp(0.85rem, 2vw, 1.15rem)',
        ...style,
      }}
    >
      {content}
    </motion.span>
  );
}

export default ShinyText;
