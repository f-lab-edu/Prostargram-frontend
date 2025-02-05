import Image from 'next/image';
import { ReactNode } from 'react';

import GroupImg from '@/assets/img/group1.png';

import styles from './layout.module.scss';

interface AuthLayoutProps {
  children?: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.left_box}>{children}</div>

        <div className={styles.right_box}>
          <Image
            className={styles.group_image}
            src={GroupImg}
            alt="group-image"
            priority
          />
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
