import { PropsWithChildren } from 'react';

import styles from './MyInterest.module.scss';

const MyInterest = ({ children }: PropsWithChildren) => (
  <span className={styles.my_interest}>#{children}</span>
);

export default MyInterest;
