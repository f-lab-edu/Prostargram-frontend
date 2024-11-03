'use client';

import If from '@/components/common/If';
import Button from '@/components/common/Button';

import FollowIcon from '@/assets/icons/follow.svg';
import UnfollowIcon from '@/assets/icons/unfollow.svg';
import { useState } from 'react';

interface ProfileFollowButtonProps {
  isFollow: boolean;
  size?: 'none' | 'small' | 'medium' | 'large';
}

const ProfileFollowButton = ({
  isFollow,
  size = 'large',
}: ProfileFollowButtonProps) => {
  const [followStatus, setFollowStatus] = useState(isFollow);

  const followHandler = () => {
    setFollowStatus(!followStatus);
  };
  const unfollowHandler = () => {
    setFollowStatus(!followStatus);
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
