'use client';

import Image from 'next/image';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';

import { getUserId } from '@/utils/manageToken';
import { useProfileImageMutation } from '@/api/profile/profileMutation';

import DefaultAvatar from '@/assets/icons/default_avatar.svg';
import ProfileEditButton from './ProfileEditButton';
import ProfileFollowButton from './ProfileFollowButton';

import styles from './Profile.module.scss';

interface ProfileProps {
  userId: number;
  profileUrl?: string;
  isFollow: boolean;
  isMine: boolean;
}

//* 기존 profileUrl(contentUrl)에 대한 File.type
const OCTET_STREAM_TYPE = 'application/octet-stream';

const Profile = ({ userId, profileUrl, isMine, isFollow }: ProfileProps) => {
  const [profile, setProfile] = useState<string | undefined>(profileUrl);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const profileId = getUserId();

  const { mutate: updateProfile } = useProfileImageMutation({
    onError: () => setProfile(profileUrl),
  });

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isMine) return;

    const imgFiles = new FormData(e.currentTarget).getAll(
      'profileImage',
    ) as File[];

    if (imgFiles[0].type !== OCTET_STREAM_TYPE) {
      updateProfile({ imgFiles }, { onSettled: () => setIsEdit(false) });
    } else {
      setIsEdit(false);
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const profileImageFile = e.target.files?.[0];

    if (profileImageFile) {
      setProfile((prev) => {
        if (prev) {
          URL.revokeObjectURL(prev);
        }
        return URL.createObjectURL(profileImageFile);
      });
    }
  };

  const cancelHandler = () => {
    setProfile(profile);
    setIsEdit(false);
  };

  const clickHandler = () => {
    if (isEdit) {
      fileRef.current?.click();
    }
  };

  const toggleEdit = () => setIsEdit((prev) => !prev);

  const ProfileImage = profile ? Image : DefaultAvatar;

  return (
    <form className={styles.profile_content} onSubmit={submitHandler}>
      {isEdit && (
        <input
          ref={fileRef}
          onChange={changeHandler}
          type="file"
          name="profileImage"
          accept="image/png,image/jpg,image/jpeg"
          style={{ display: 'none' }}
        />
      )}

      <button
        type="button"
        className={styles.profile_image_button}
        onClick={clickHandler}
      >
        <ProfileImage
          src={profile}
          width="150"
          height="150"
          alt="profile-image"
          priority
        />
      </button>

      <div className={styles.profile_button_wrapper}>
        {isMine ? (
          <ProfileEditButton
            isEdit={isEdit}
            onCancel={cancelHandler}
            onToggle={toggleEdit}
          />
        ) : (
          <ProfileFollowButton
            fromUserId={profileId}
            toUserId={userId}
            isFollow={isFollow}
          />
        )}
      </div>
    </form>
  );
};

export default Profile;
