'use client';

import { useState } from 'react';

import If from '@/components/common/If';
import Button from '@/components/common/Button';

import FollowIcon from '@/assets/icons/follow.svg';
import UnfollowIcon from '@/assets/icons/unfollow.svg';
import { useFollowUser, useUnfollowUser } from '@/api/follow/followMutations';

interface ProfileFollowButtonProps {
  fromUserId?: number;
  toUserId?: number;
  isFollow: boolean;
  size?: 'none' | 'small' | 'medium' | 'large';
}

// TODO: default 제거
const ProfileFollowButton = ({
  fromUserId = 1,
  toUserId = 1,
  isFollow,
  size = 'large',
}: ProfileFollowButtonProps) => {
  const [followStatus, setFollowStatus] = useState(isFollow);

  const followHandler = () => {
    setFollowStatus(() => {
      return true;
    });
  };
  const unfollowHandler = () => {
    setFollowStatus(() => {
      return false;
    });
  };

  const { mutate: followUserMutation } = useFollowUser(
    {
      fromUserId,
      toUserId,
    },
    {
      onSuccess: () => followHandler(),
    },
  );
  const { mutate: unfollowUserMutation } = useUnfollowUser(
    {
      fromUserId,
      toUserId,
    },
    {
      onSuccess: () => unfollowHandler(),
    },
  );

  return (
    <If condition={followStatus}>
      <If.True>
        <Button size={size} fill="red" onClick={() => unfollowUserMutation()}>
          <UnfollowIcon
            width="20"
            height="20"
            style={{ marginLeft: -5, marginRight: 5 }}
          />
          언팔로우
        </Button>
      </If.True>
      <If.False>
        <Button size={size} onClick={() => followUserMutation()}>
          <FollowIcon
            width="20"
            height="20"
            style={{ marginLeft: -5, marginRight: 5 }}
          />
          팔로우
        </Button>
      </If.False>
    </If>
  );
};

export default ProfileFollowButton;
