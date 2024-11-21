import { useCallback, useEffect, useRef, useState } from 'react';

const ONE_SECOND = 1_000;

interface UseTimerParams {
  waitTime: number;
}

const useTimer = ({ waitTime }: UseTimerParams) => {
  const [time, setTime] = useState<number>(waitTime);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const changeTime = useCallback((nextTime: number) => setTime(nextTime), []);

  const clearTimer = useCallback(() => {
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();

    if (time > 0) {
      timerId.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= ONE_SECOND) {
            clearTimer();
            return 0;
          }
          return prevTime - ONE_SECOND;
        });
      }, ONE_SECOND);
    }
  }, [time, clearTimer]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return { time, startTimer, changeTime, clearTimer };
};

export default useTimer;
