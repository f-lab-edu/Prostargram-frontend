import Link from 'next/link';
import { ReactNode } from 'react';

import styles from './Follow.module.scss';

interface FollowProps {
  title: string;
  href: string;
  children?: ReactNode;
}

const Follow = ({ title, href, children }: FollowProps) => {
  return (
    <div className={styles.follow}>
      <p>{title}</p>
      <Link href={href}>
        <p className={styles.text_blue}>{children}</p>
      </Link>
    </div>
  );
};

export default Follow;
