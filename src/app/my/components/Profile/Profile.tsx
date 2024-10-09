'use client';

import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';

import If from '@/components/common/If';

import DefaultAvatar from '@/assets/icons/default_avatar.svg';
import ProfileEditButton from './ProfileEditButton';
import ProfileFollowButton from './ProfileFollowButton';

import styles from './Profile.module.scss';

interface ProfileProps {
  profileUrl?: string;
  isFollow: boolean;
  isMine: boolean;
}

const Profile = ({ profileUrl, isMine, isFollow }: ProfileProps) => {
  const [profile, setProfile] = useState<string | undefined>(profileUrl);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleEdit = () => setIsEdit((prev) => !prev);

  const saveHandler = () => {
    toggleEdit();
    console.log(file);
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
          setFile(profileObject);
        }
      };
    }
  };

  return (
    <div className={styles.profile_content}>
      <div className={styles.profile_image}>
        <If condition={isEdit}>
          <If.True>
            <input
              type="file"
              ref={fileRef}
              onChange={changeHandler}
              style={{ display: 'none' }}
            />
            <Image
              src={profile!}
              width="150"
              height="150"
              alt="profile-image"
              style={{ cursor: 'pointer' }}
              priority
              onClick={clickHandler}
            />
          </If.True>
        </If>
        <If.False>
          <If condition={Boolean(profile)}>
            <If.True>
              <Image
                src={profile!}
                width="150"
                height="150"
                alt="profile-image"
                priority
              />
            </If.True>
            <If.False>
              <DefaultAvatar width="150" height="150" />
            </If.False>
          </If>
        </If.False>
      </div>

      <div className={styles.profile_button_wrapper}>
        <If condition={isMine}>
          <If.True>
            <ProfileEditButton
              isEdit={isEdit}
              onSave={saveHandler}
              onCancel={cancelHandler}
              onToggle={toggleEdit}
            />
          </If.True>
          <If.False>
            <ProfileFollowButton isFollow={isFollow} />
          </If.False>
        </If>
      </div>
    </div>
  );
};

export default Profile;
