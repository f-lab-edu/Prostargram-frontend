import FollowingList from './components/FollowingList/FollowingList';
import FeedList from './components/FeedList/FeedList';
import styles from './page.module.scss';

const MainPage = () => {
  return (
    <div className={styles.container}>
      <FollowingList />
      <FeedList />
    </div>
  );
};
export default MainPage;
