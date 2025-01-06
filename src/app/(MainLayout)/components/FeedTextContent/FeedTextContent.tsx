import Image from 'next/image';

import { compactTimeFormatter } from '@/utils/formatter';
import ProfileFollowButton from '@/app/my/components/Profile/ProfileFollowButton';
import { getUserId } from '@/utils/manageToken';

import styles from './FeedTextContent.module.scss';

interface FeedTextContentProps {
  feedData: {
    userId: number;
    userName: string;
    profileUrl?: string;
    createdAt: string;
    isFollow: boolean;
    content: string;
    hashTagNames: string[];
  };
}

const DEFAULT_PROFILE =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vkwPhD-NHO6sV_3ailgWXjiP_WPM24J3IhkB3xZ-bQ&s';

const FeedTextContent = ({ feedData }: FeedTextContentProps) => {
  const {
    userId: toUserId,
    userName,
    profileUrl = DEFAULT_PROFILE,
    isFollow,
    createdAt,
    content,
    hashTagNames,
  } = feedData;

  const userId = getUserId();

  return (
    <div className={styles.container}>
      <div className={styles.profile_wrapper}>
        <div className={styles.profile}>
          <div className={styles.profile_image}>
            <Image width="32" height="32" src={profileUrl} alt="user_profile" />
          </div>
          <p className={styles.username}>{userName}</p>
          <p className={styles.feed_time}>{compactTimeFormatter(createdAt)}</p>
        </div>
        <div className={styles.profile_follow_btn}>
          <ProfileFollowButton
            fromUserId={userId}
            toUserId={toUserId}
            size="small"
            isFollow={isFollow}
          />
        </div>
      </div>
      <p className={styles.feed_content}>{content}</p>
      <div className={styles.hashtag_wrapper}>
        {hashTagNames.map((hashtag) => (
          <p key={hashtag}>#{hashtag}</p>
        ))}
      </div>
    </div>
  );
};

export default FeedTextContent;
