import { useEffect, useState } from 'react';

export const useCountUp = (target: number, duration = 900) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target <= 0 || typeof window === 'undefined') {
      setValue(target);
      return;
    }

    let frameId = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(target * easedProgress));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    setValue(0);
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [duration, target]);

  return value;
};

export default useCountUp;
