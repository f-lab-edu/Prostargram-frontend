import { useEffect, useRef, useState } from 'react';

interface UseTimerParams {
  waitTime: number;
}

const useTimer = ({ waitTime }: UseTimerParams) => {
  const [time, setTime] = useState<number>(waitTime);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const changeTime = (nextTime: number) => setTime(nextTime);

  const clearTimer = () => {
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
  };

  const startTimer = () => {
    clearTimer();

    if (time > 0) {
      timerId.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1000) {
            clearTimer();
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  return { time, startTimer, changeTime, clearTimer };
};

export default useTimer;
