import Image from 'next/image';
import { ReactNode } from 'react';

import GroupImg from '@/assets/img/group1.png';

import * as Styles from './AuthLayout.css';

interface AuthLayoutProps {
  children?: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={Styles.container}>
      <main className={Styles.innerContainer}>
        <div className={Styles.leftBox}>{children}</div>

        <div className={Styles.rightBox}>
          <Image
            src={GroupImg}
            className={Styles.groupImg}
            alt="group-image"
            priority
          />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
