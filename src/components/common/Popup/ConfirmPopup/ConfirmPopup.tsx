import clsx from 'clsx';
import styles from './ConfirmPopup.module.scss';
import Typo from '../../Typo';
import Button from '../../Button';

type ConfirmPopupProps = {
  leftBtnColor: 'blue' | 'red' | 'white' | 'gray';
  rightBtnColor: 'blue' | 'red' | 'white' | 'gray';
  leftBtnText: string;
  rightBtnText: string;
  mainText: string;
  subText?: string;
  onAction?: () => void;
  onCancel?: () => void;
  className?: string;
};

const ConfirmPopup = ({
  leftBtnColor,
  rightBtnColor,
  leftBtnText,
  rightBtnText,
  mainText,
  subText,
  onAction,
  onCancel,
  className,
}: ConfirmPopupProps) => {
  return (
    <div className={styles.popup_bg}>
      <div className={clsx([styles.popup_box, className])}>
        <Typo as="h1" fontSize="body-20" color="gray-2">
          {mainText}
        </Typo>
        <Typo as="h2" fontSize="body-14" color="gray-4">
          {subText}
        </Typo>

        <div className={styles.button_box}>
          <Button fill={leftBtnColor} size="medium" onClick={onAction}>
            {leftBtnText}
          </Button>
          <Button fill={rightBtnColor} size="medium" onClick={onCancel}>
            {rightBtnText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
