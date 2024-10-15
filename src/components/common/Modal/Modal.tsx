import { CSSProperties, MouseEvent, ReactNode } from 'react';
import styles from './modal.module.scss';

type ModalProps = {
  children?: ReactNode;
  width?: CSSProperties['width'];
  onClose: (status: boolean) => void;
};

const Modal = ({ children, width = '800px', onClose }: ModalProps) => {
  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.modal_bg}
        onClick={() => onClose(false)}
        aria-hidden="true"
      />
      <div
        className={styles.container}
        style={{ width }}
        onClick={handleContainerClick}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
