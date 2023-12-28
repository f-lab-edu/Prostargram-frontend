import { Link } from 'react-router-dom';
import * as Styles from './Logo.css';

const Logo = () => {
  return (
    <Link to="/">
      <div className={Styles.LogoStyle}>Prostargram</div>
    </Link>
  );
};

export default Logo;
