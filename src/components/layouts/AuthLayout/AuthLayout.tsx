/// <reference types="vite-plugin-svgr/client" />

import { Outlet } from 'react-router-dom';

import GroupSVG from '@assets/svg/group1.svg?react';
import * as Styles from './AuthLayout.css';

const AuthLayout = () => {
  return (
    <div className={Styles.container}>
      <main className={Styles.innerContainer}>
        <div className={Styles.leftBox}>
          <Outlet />
        </div>

        <div className={Styles.rightBox}>
          <GroupSVG className={Styles.groupSVG} />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
