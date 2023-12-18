import { Outlet } from 'react-router-dom';
import * as Styles from './AuthLayout.css';

const AuthLayout = () => {
  return (
    <div className={Styles.container}>
      <main className={Styles.innerContainer}>
        <div className={Styles.leftBox}>
          <Outlet />
        </div>

        <div className={Styles.rightBox}>
          <p>그리임</p>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
