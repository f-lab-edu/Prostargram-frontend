import { CSSProperties, ReactNode } from 'react';
import styles from './modal.module.scss';

type ModalProps = {
  children?: ReactNode;
  width?: CSSProperties['width'];
  onClose: () => void;
};

const Modal = ({ children, width = '800px', onClose }: ModalProps) => {
  return (
    <div className={styles.wrapper}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div className={styles.modal_bg} onClick={onClose} />
      <div className={styles.container} style={{ width }}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
