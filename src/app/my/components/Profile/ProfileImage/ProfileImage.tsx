import Image from 'next/image';

import DefaultAvatar from '@/assets/icons/default_avatar.svg';

import * as Styles from './ProfileImage.css';

interface ProfileImageProps {
  profileUrl?: string;
}

const ProfileImage = ({ profileUrl }: ProfileImageProps) => {
  return (
    <div className={Styles.profileImage}>
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
  );
};

export default ProfileImage;
