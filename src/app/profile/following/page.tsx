import FollowList from '../components/FollowList';

import styles from './page.module.scss';

const FollowingPage = () => {
  return (
    <div>
      <h1 className={styles.follower_page_subject}>팔로잉 페이지</h1>
      <ul className={styles.profile_list}>
        <FollowList type="followings" />
      </ul>
    </div>
  );
};

export default FollowingPage;
