import Link from 'next/link';
import { ReactNode } from 'react';

import * as Styles from './Follow.css';

interface FollowProps {
  title: string;
  href: string;
  children?: ReactNode;
}

const Follow = ({ title, href, children }: FollowProps) => {
  return (
    <div className={Styles.follow}>
      <p>{title}</p>
      <Link href={href}>
        <p className={Styles.textBlue}>{children}</p>
      </Link>
    </div>
  );
};

export default Follow;
