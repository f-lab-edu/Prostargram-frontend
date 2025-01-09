import { useState } from 'react';
import clsx from 'clsx';
import styles from './ToggleButton.module.scss';

interface ToggleButtonProps {
  onText: string;
  offText: string;
  on?: () => void;
  off?: () => void;
}

const ToggleButton = ({ onText, offText, on, off }: ToggleButtonProps) => {
  const [isActive, setIsActive] = useState(false);
  const checkedStyle = {
    [styles.checked]: isActive,
  };

  const onToggle = () => {
    setIsActive((prev) => {
      const newState = !prev;
      if (newState && on) on();
      if (!newState && off) off();
      return newState;
    });
  };

  return (
    <div
      role="presentation"
      className={clsx(styles.container, checkedStyle)}
      onClick={onToggle}
    >
      <div className={clsx(styles.text, checkedStyle)}>
        {isActive ? onText : offText}
      </div>
      <div role="presentation" className={clsx(styles.toggle, checkedStyle)} />
    </div>
  );
};

export default ToggleButton;
