import { Outlet } from 'react-router-dom';
import { h1 } from './AuthLayout.css';

const AuthLayout = () => {
  return (
    <div>
      <h1 className={h1}>AuthLayout</h1>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
