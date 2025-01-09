import Link from 'next/link';
import { ReactNode } from 'react';

import styles from './FeedCount.module.scss';

interface FeedCountProps {
  title: string;
  href: string;
  children?: ReactNode;
}

const FeedCount = ({ title, href, children }: FeedCountProps) => {
  return (
    <div className={styles.feed}>
      <p>{title}</p>
      <Link href={href}>
        <p className={styles.text_blue}>{children}</p>
      </Link>
    </div>
  );
};

export default FeedCount;
