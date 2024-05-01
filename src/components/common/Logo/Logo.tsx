'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import GitHubIcon from '@/assets/icons/github.svg';

import * as Styles from './Logo.css';

const Logo = () => {
  const pathname = usePathname();

  return (
    <Link href="/" className={Styles.link}>
      <span className={Styles.logo}>
        Prostargram
        {pathname === '/auth/github' && (
          <GitHubIcon className={Styles.github} />
        )}
      </span>
    </Link>
  );
};

export default Logo;
