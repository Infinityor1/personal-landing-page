import { useCallback } from 'react';

export function useSmoothScroll({ defaultDuration = 800, defaultOffset = 0 } = {}) {
  const scrollTo = useCallback((targetRefOrId, customDuration, customOffset) => {
    // Resolve the target element (supports both React Refs and string IDs)
    let target = null;
    if (typeof targetRefOrId === 'string') {
      target = document.getElementById(targetRefOrId);
    } else if (targetRefOrId?.current) {
      target = targetRefOrId.current;
    }

    if (!target) return;

    // Use custom parameters if provided, otherwise fallback to defaults
    const duration = customDuration ?? defaultDuration;
    const offset = customOffset ?? defaultOffset;

    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // easeInOutCubic
    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t + b;
      t -= 2;
      return (c / 2) * (t * t * t + 2) + b;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;

      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        window.scrollTo(0, targetPosition); // Snap to end
      }
    };

    requestAnimationFrame(animation);
  }, [defaultDuration, defaultOffset]);

  return scrollTo;
}

export const smoothScroll = useSmoothScroll;
