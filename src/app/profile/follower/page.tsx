import FollowList from '../components/FollowList';

import styles from './page.module.scss';

const FollowerPage = () => {
  return (
    <div>
      <h1 className={styles.follower_page_subject}>팔로워 페이지</h1>
      <ul className={styles.profile_list}>
        <FollowList type="followers" />
      </ul>
    </div>
  );
};

export default FollowerPage;
