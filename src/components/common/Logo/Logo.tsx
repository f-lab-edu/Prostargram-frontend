'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import GitHubIcon from '@/assets/icons/github.svg';

import styles from './Logo.module.scss';

const Logo = () => {
  const pathname = usePathname();

  return (
    <Link href="/" className={styles.link}>
      <span className={styles.logo}>
        Prostargram
        {pathname === '/auth/github' && (
          <GitHubIcon className={styles.github} />
        )}
      </span>
    </Link>
  );
};

export default Logo;
