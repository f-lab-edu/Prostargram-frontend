import Image from 'next/image';
import { ReactNode } from 'react';

import GroupImg from '@/assets/img/group1.png';

import styles from './layout.module.scss';

interface AuthLayoutProps {
  children?: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={styles.container}>
      <main className={styles.inner_container}>
        <div className={styles.left_box}>{children}</div>

        <div className={styles.right_box}>
          <Image src={GroupImg} alt="group-image" priority />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
