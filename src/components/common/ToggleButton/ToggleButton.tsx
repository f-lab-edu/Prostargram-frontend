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

  const onToggle = () => {
    if (!isActive && on) {
      on();
    }
    if (isActive && off) {
      off();
    }
    setIsActive(!isActive);
  };

  return (
    <div
      role="presentation"
      className={clsx(styles.container, {
        [styles.checked]: isActive,
      })}
      onClick={onToggle}
    >
      <div
        className={clsx(styles.text, {
          [styles.checked]: isActive,
        })}
      >
        {isActive ? onText : offText}
      </div>
      <div
        role="presentation"
        className={clsx(styles.toggle, {
          [styles.checked]: isActive,
        })}
      />
    </div>
  );
};

export default ToggleButton;
