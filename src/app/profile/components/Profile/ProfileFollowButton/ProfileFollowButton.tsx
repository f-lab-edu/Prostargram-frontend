'use client';

import If from '@/components/common/If';
import Button from '@/components/common/Button';

import FollowIcon from '@/assets/icons/follow.svg';
import UnfollowIcon from '@/assets/icons/unfollow.svg';
import { useFollowUser, useUnfollowUser } from '@/api/follow/followMutations';
import { useQueryClient } from '@tanstack/react-query';
import { FEED_QUERY_KEYS } from '@/api/feed/feedQueries';

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
  const queryClient = useQueryClient();

  const { mutate: followUserMutation } = useFollowUser(
    {
      fromUserId,
      toUserId,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: FEED_QUERY_KEYS.feeds,
        });
      },
    },
  );
  const { mutate: unfollowUserMutation } = useUnfollowUser(
    {
      fromUserId,
      toUserId,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: FEED_QUERY_KEYS.feeds,
        });
      },
    },
  );

  return (
    <If condition={isFollow}>
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
