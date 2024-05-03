import { PropsWithChildren } from 'react';

import * as Styles from './MyInterest.css';

const MyInterest = ({ children }: PropsWithChildren) => (
  <span className={Styles.myInterest}>#{children}</span>
);

export default MyInterest;
