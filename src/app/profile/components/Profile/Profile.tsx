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

const Profile = ({ userId, profileUrl, isMine, isFollow }: ProfileProps) => {
  const [profile, setProfile] = useState<string | undefined>(profileUrl);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const myUserId = getUserId();

  const { mutate: updateProfile } = useProfileImageMutation();

  const toggleEdit = () => setIsEdit((prev) => !prev);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isMine) return;

    updateProfile(
      { formData: new FormData(e.currentTarget) },
      {
        onSuccess: () => toggleEdit(),
      },
    );
  };

  const cancelHandler = () => {
    setProfile(profileUrl);
    toggleEdit();
  };

  const clickHandler = () => {
    fileRef.current?.click();
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const profileObject = e.target.files?.[0];
    if (profileObject) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(profileObject);
      fileReader.onload = (data) => {
        const result = data.target?.result;
        if (typeof result === 'string') {
          setProfile(result);
        }
      };
    }
  };

  return (
    <form className={styles.profile_content} onSubmit={submitHandler}>
      <div className={styles.profile_image}>
        {isEdit && (
          <>
            <input
              ref={fileRef}
              onChange={changeHandler}
              type="file"
              name="profileImage"
              accept="image/png,image/jpg,image/jpeg"
              style={{ display: 'none' }}
            />
            {profile ? (
              <Image
                src={profile}
                width="150"
                height="150"
                alt="profile-image1"
                onClick={clickHandler}
                priority
              />
            ) : (
              <DefaultAvatar width="150" height="150" onClick={clickHandler} />
            )}
          </>
        )}

        {!isEdit &&
          (profile ? (
            <Image
              src={profile}
              width="150"
              height="150"
              alt="profile-image2"
              onClick={clickHandler}
              priority
            />
          ) : (
            <DefaultAvatar width="150" height="150" onClick={clickHandler} />
          ))}
      </div>

      <div className={styles.profile_button_wrapper}>
        {isMine ? (
          <ProfileEditButton
            isEdit={isEdit}
            onCancel={cancelHandler}
            onToggle={toggleEdit}
          />
        ) : (
          <ProfileFollowButton
            fromUserId={myUserId}
            toUserId={userId}
            isFollow={isFollow}
          />
        )}
      </div>
    </form>
  );
};

export default Profile;
