import { CSSProperties, MouseEvent, ReactNode } from 'react';
import Portal from '../Portal/Portal';
import styles from './modal.module.scss';

type ModalProps = {
  children?: ReactNode;
  width?: CSSProperties['width'];
  maxWidth?: CSSProperties['maxWidth'];
  height?: CSSProperties['height'];
  maxHeight?: CSSProperties['maxHeight'];
  onClose?: (status: boolean) => void;
};

const Modal = ({
  children,
  width = '800px',
  maxWidth,
  height,
  maxHeight,
  onClose,
}: ModalProps) => {
  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleWrapperClick = () => {
    if (onClose) onClose(false);
  };

  return (
    <Portal>
      <div className={styles.wrapper}>
        <div
          className={styles.modal_bg}
          onClick={handleWrapperClick}
          role="presentation"
        />
        <div
          className={styles.container}
          style={{ width, maxWidth, height, maxHeight }}
          onClick={handleContainerClick}
          role="presentation"
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
