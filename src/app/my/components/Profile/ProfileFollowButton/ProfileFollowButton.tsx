'use client';

import { useState } from 'react';

import If from '@/components/common/If';
import Button from '@/components/common/Button';

import FollowIcon from '@/assets/icons/follow.svg';
import UnfollowIcon from '@/assets/icons/unfollow.svg';
import { useFollowUser, useUnfollowUser } from '@/api/follow/followMutations';

interface ProfileFollowButtonProps {
  userId?: number;
  isFollow: boolean;
  size?: 'none' | 'small' | 'medium' | 'large';
}

const ProfileFollowButton = ({
  userId,
  isFollow,
  size = 'large',
}: ProfileFollowButtonProps) => {
  const [followStatus, setFollowStatus] = useState(isFollow);

  // TODO: fromUserId 변경
  const { mutate: followUserMutation } = useFollowUser({
    fromUserId: 1,
    toUserId: userId!,
  });
  const { mutate: unfollowUserMutation } = useUnfollowUser({
    fromUserId: 1,
    toUserId: userId!,
  });

  const followHandler = () => {
    setFollowStatus(() => {
      followUserMutation();
      return true;
    });
  };
  const unfollowHandler = () => {
    setFollowStatus(() => {
      unfollowUserMutation();
      return false;
    });
  };

  return (
    <If condition={followStatus}>
      <If.True>
        <Button size={size} fill="red" onClick={unfollowHandler}>
          <UnfollowIcon
            width="20"
            height="20"
            style={{ marginLeft: -5, marginRight: 5 }}
          />
          언팔로우
        </Button>
      </If.True>
      <If.False>
        <Button size={size} onClick={followHandler}>
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
