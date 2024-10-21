import { ReactNode } from 'react';
import styles from './wrapper.module.scss';

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default Wrapper;
