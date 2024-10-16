import OtherProfile from './components/OtherProfile';

import styles from './page.module.scss';

const MOCK_PROFILES = [
  {
    username: '홍길동',
    description: '프론트엔드 개발자 입니다.',
    profileUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vkwPhD-NHO6sV_3ailgWXjiP_WPM24J3IhkB3xZ-bQ&s',
    isFollow: true,
  },
  {
    username: '김철수',
    description: '백엔드 개발자 입니다.',
    profileUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vkwPhD-NHO6sV_3ailgWXjiP_WPM24J3IhkB3xZ-bQ&s',
    isFollow: true,
  },
];

const FollowerPage = () => {
  return (
    <div>
      <h1 className={styles.follower_page_subject}>팔로워 페이지</h1>
      <ul className={styles.profile_list}>
        {MOCK_PROFILES.map((follower) => (
          <OtherProfile key={follower.username} {...follower} />
        ))}
      </ul>
    </div>
  );
};

export default FollowerPage;
