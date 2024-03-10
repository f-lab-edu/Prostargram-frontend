import { Link, useLocation } from 'react-router-dom';

import GitHubIcon from '@assets/icons/github.svg?react';
import * as Styles from './Logo.css';

const Logo = () => {
  const location = useLocation();

  return (
    <Link to="/" className={Styles.link}>
      <span className={Styles.logo}>
        Prostargram
        {location.pathname === '/auth/github' && (
          <GitHubIcon className={Styles.github} />
        )}
      </span>
    </Link>
  );
};

export default Logo;
