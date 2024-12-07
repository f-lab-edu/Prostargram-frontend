import { MOCK_DATA_OF_FOLLOWING_DATA } from '@/data/mock';

import FollowingList from './components/FollowingList/FollowingList';
import FeedList from './components/FeedList/FeedList';
import styles from './page.module.scss';

const MainPage = () => {
  return (
    <div className={styles.container}>
      <FollowingList followingUsers={MOCK_DATA_OF_FOLLOWING_DATA} />
      <FeedList />
    </div>
  );
};
export default MainPage;
