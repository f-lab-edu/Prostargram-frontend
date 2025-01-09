import { Suspense } from 'react';

import LocalQueryErrorBoundary from '@/components/common/LocalQueryErrorBoundary';
import FollowingList from './components/FollowingList/FollowingList';
import FeedList from './components/FeedList/FeedList';

import styles from './page.module.scss';

const MainPage = () => {
  return (
    <div className={styles.container}>
      <LocalQueryErrorBoundary>
        <Suspense>
          <FollowingList userId={1} />
          <FeedList />
        </Suspense>
      </LocalQueryErrorBoundary>
    </div>
  );
};
export default MainPage;
