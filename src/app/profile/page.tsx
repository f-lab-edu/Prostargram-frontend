'use client';

import { getUserId } from '@/utils/manageToken';
import Mypage from './components/Mypage';

import styles from './page.module.scss';

const MyFeedPage = () => {
  const userId = getUserId();

  return (
    <div className={styles.container}>
      <Mypage userId={userId} />
    </div>
  );
};

export default MyFeedPage;
