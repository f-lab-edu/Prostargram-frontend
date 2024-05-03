import Link from 'next/link';
import { ReactNode } from 'react';

import * as Styles from './FeedCount.css';

interface FeedCountProps {
  title: string;
  href: string;
  children?: ReactNode;
}

const FeedCount = ({ title, href, children }: FeedCountProps) => {
  return (
    <div className={Styles.feed}>
      <p>{title}</p>
      <Link href={href}>
        <p className={Styles.textBlue}>{children}</p>
      </Link>
    </div>
  );
};

export default FeedCount;
