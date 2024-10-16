import Image from 'next/image';

import ProfileFollowButton from '../Profile/ProfileFollowButton';

import styles from './FollowList.module.scss';

interface FollowProflieType {
  username: string;
  description: string;
  isFollow: boolean;
  profileUrl?: string;
}

interface FollowListProps {
  profileList: FollowProflieType[];
}

const FollowList = ({ profileList }: FollowListProps) => {
  return profileList.map(({ username, description, isFollow, profileUrl }) => (
    <div className={styles.container}>
      <div className={styles.profile_wrapper}>
        <div className={styles.profile_image}>
          {profileUrl ? (
            <Image
              src={profileUrl}
              width="50"
              height="50"
              alt={`${username}-profile`}
            />
          ) : (
            '프로필'
          )}
        </div>
        <div className={styles.profile_information}>
          <p className={styles.username}>{username}</p>
          <p>{description}</p>
        </div>
      </div>
      <ProfileFollowButton isFollow={isFollow} />
    </div>
  ));
};

export default FollowList;
