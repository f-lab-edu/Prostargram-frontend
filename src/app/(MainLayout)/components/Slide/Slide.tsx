'use client';

import {
  Children,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';

import LeftArrowIcon from '@/assets/icons/left_arrow.svg';
import RightArrowIcon from '@/assets/icons/right_arrow.svg';

import styles from './Slide.module.scss';

interface SlideProps {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Slide = ({ children, leftIcon, rightIcon }: SlideProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [parentWidth, setParentWidth] = useState<number | undefined>(
    0 || undefined,
  );
  const containerRef = useRef<HTMLUListElement>(null);

  const updateParentWidth = useCallback(() => {
    if (containerRef.current) {
      setParentWidth(containerRef.current.offsetWidth);
    }
  }, []);

  // ? debounce 적용 함수
  // const debouncedUpdateParentWidth = useCallback(
  //   debounce(updateParentWidth, 200),
  //   [updateParentWidth],
  // );

  useEffect(() => {
    updateParentWidth();
  }, [updateParentWidth]);

  useEffect(() => {
    window.addEventListener('resize', () => updateParentWidth);

    return () => {
      window.removeEventListener('resize', () => updateParentWidth);
    };
  }, [updateParentWidth]);

  const slideItems =
    Children.map<ReactNode, ReactNode>(children, (childElement) => (
      <li
        className={styles.slide_item}
        style={{ width: parentWidth, flexShrink: 0 }}
      >
        {childElement}
      </li>
    )) ?? [];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slideItems.length - 1 : prevIndex - 1,
    );
  };

  const hasNext = currentIndex < slideItems.length - 1;
  const hasPrev = currentIndex > 0;

  return (
    <ul className={styles.container} ref={containerRef}>
      <div
        className={styles.slide_wrapper}
        style={{
          transform: `translateX(-${currentIndex * (parentWidth ?? 0)}px)`,
        }}
      >
        {slideItems}
      </div>

      {hasPrev && (
        <button
          className={clsx(styles.arrow, styles.left_arrow)}
          onClick={handlePrev}
        >
          {leftIcon ?? <LeftArrowIcon />}
        </button>
      )}
      {hasNext && (
        <button
          className={clsx(styles.arrow, styles.right_arrow)}
          onClick={handleNext}
        >
          {rightIcon ?? <RightArrowIcon />}
        </button>
      )}
    </ul>
  );
};

export default Slide;
