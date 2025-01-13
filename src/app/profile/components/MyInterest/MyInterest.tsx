'use client';

import { useState } from 'react';

import If from '@/components/common/If';
import useInterestsServerRequests from '@/hooks/useInterestsServerRequests';
import MyReadOnlyInterest from './MyReadOnlyInterest';
import MyEditInterest from './MyEditInterest';
import {
  UserInterestType,
  UserInterestWithOptionalHashTagIdType,
} from '../../types/my';

import styles from './MyInterest.module.scss';

interface MyInterestProps {
  interests: UserInterestType[];
  isMine: boolean;
}

const MyInterest = ({ isMine, interests }: MyInterestProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [myInterests, setMyInterests] =
    useState<UserInterestWithOptionalHashTagIdType[]>(interests);
  const { requestSaveInterest, requestRemoveInterest } =
    useInterestsServerRequests();

  const toggleHandler = () => {
    setIsEdit((prev) => !prev);
  };

  const submitHandler = ({
    nextInterestsState,
    add,
    remove,
  }: {
    nextInterestsState: UserInterestWithOptionalHashTagIdType[];
    add: UserInterestWithOptionalHashTagIdType[];
    remove: UserInterestWithOptionalHashTagIdType[];
  }) => {
    requestSaveInterest({
      targetInterests: add.map(({ hashTagName }) => ({
        interestName: hashTagName,
      })),
    });
    requestRemoveInterest({
      targetInterests: remove.map(({ hashTagName, hashTagId }) => ({
        hashTagId,
        interestName: hashTagName,
      })),
    });

    setMyInterests(nextInterestsState);
    toggleHandler();
  };

  return (
    <div className={styles.container}>
      <If condition={isEdit}>
        <If.True>
          <MyEditInterest
            interests={myInterests}
            submitHandler={submitHandler}
            toggleHandler={toggleHandler}
          />
        </If.True>
        <If.False>
          <MyReadOnlyInterest
            isMine={isMine}
            interests={myInterests}
            toggleHandler={toggleHandler}
          />
        </If.False>
      </If>
    </div>
  );
};

export default MyInterest;
