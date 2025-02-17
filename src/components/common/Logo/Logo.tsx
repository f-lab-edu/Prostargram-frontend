'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import GitHubIcon from '@/assets/icons/github.svg';

import styles from './Logo.module.scss';

interface LogoProps {
  isGoHome?: boolean;
  href?: string;
}

const Logo = ({ isGoHome = true, href = '/' }: LogoProps) => {
  const pathname = usePathname();

  const Wrapper = isGoHome ? Link : 'div';

  return (
    <Wrapper href={isGoHome ? href : ''} className={styles.link}>
      <span className={styles.logo}>
        Prostargram
        {pathname === '/auth/github' && (
          <GitHubIcon className={styles.github} />
        )}
      </span>
    </Wrapper>
  );
};

export default Logo;
