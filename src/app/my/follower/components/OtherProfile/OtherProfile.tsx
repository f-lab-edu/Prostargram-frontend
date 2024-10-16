import Image from 'next/image';

import ProfileFollowButton from '@/app/my/components/Profile/ProfileFollowButton';

import styles from './OtherProfile.module.scss';

interface OtherProfileProps {
  isFollow: boolean;
  profileUrl?: string;
  username: string;
  description: string;
}

const OtherProfile = ({
  isFollow,
  profileUrl,
  username,
  description,
}: OtherProfileProps) => {
  return (
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
  );
};

export default OtherProfile;
