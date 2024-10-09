import If from '@/components/common/If';
import Button from '@/components/common/Button';

import FollowIcon from '@/assets/icons/follow.svg';
import UnfollowIcon from '@/assets/icons/unfollow.svg';

interface ProfileFollowButtonProps {
  isFollow: boolean;
}

const ProfileFollowButton = ({ isFollow }: ProfileFollowButtonProps) => {
  return (
    <If condition={isFollow}>
      <If.True>
        <Button size="large" fill="red">
          <UnfollowIcon
            width="20"
            height="20"
            style={{ marginLeft: -5, marginRight: 5 }}
          />
          언팔로우
        </Button>
      </If.True>
      <If.False>
        <Button size="large">
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
