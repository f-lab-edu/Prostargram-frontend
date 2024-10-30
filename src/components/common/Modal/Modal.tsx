import { CSSProperties, MouseEvent, ReactNode } from 'react';
import styles from './modal.module.scss';

type ModalProps = {
  children?: ReactNode;
  width?: CSSProperties['width'];
  onClose?: (status: boolean) => void;
};

const Modal = ({ children, width = '800px', onClose }: ModalProps) => {
  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleWrapperClick = () => {
    if (onClose) onClose(false);
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.modal_bg}
        onClick={handleWrapperClick}
        role="presentation"
      />
      <div
        className={styles.container}
        style={{ width }}
        onClick={handleContainerClick}
        role="presentation"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
