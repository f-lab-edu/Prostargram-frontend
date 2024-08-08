import Button from '@/components/common/Button';

import FollowIcon from '@/assets/icons/follow.svg';
import UnfollowIcon from '@/assets/icons/unfollow.svg';

interface ProfileButtonsProps {
  isFollow?: boolean;
}

const ProfileButtons = ({ isFollow }: ProfileButtonsProps) => {
  return isFollow ? (
    <Button fill="red">
      <UnfollowIcon
        width="20"
        height="20"
        style={{ marginLeft: -5, marginRight: 5 }}
      />
      언팔로우
    </Button>
  ) : (
    <Button>
      <FollowIcon
        width="20"
        height="20"
        style={{ marginLeft: -5, marginRight: 5 }}
      />
      팔로우
    </Button>
  );
};

export default ProfileButtons;
