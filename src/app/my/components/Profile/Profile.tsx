import Image from 'next/image';
import { ReactNode } from 'react';

import DefaultAvatar from '@/assets/icons/default_avatar.svg';

import styles from './Profile.module.scss';

interface ProfileProps {
  profileUrl?: string;
  children?: ReactNode;
}

const Profile = ({ children, profileUrl }: ProfileProps) => {
  return (
    <div className={styles.profile_content}>
      <div className={styles.profile_image}>
        {profileUrl ? (
          <Image
            src={profileUrl}
            width="150"
            height="150"
            alt="profile-image"
            priority
          />
        ) : (
          <DefaultAvatar width="150" height="150" />
        )}
      </div>
      {children}
    </div>
  );
};

export default Profile;
