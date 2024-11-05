import Image from 'next/image';

import { compactTimeFormatter } from '@/utils/formatter';
import ProfileFollowButton from '@/app/my/components/Profile/ProfileFollowButton';

import styles from './FeedTextContent.module.scss';

interface FeedTextContentProps {
  feedData: {
    username: string;
    profileUrl?: string;
    createdAt: string;
    updatedAt?: string;
    isFollow: boolean;
    content: string;
    hashtags: string[];
  };
}

const DEFAULT_PROFILE =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vkwPhD-NHO6sV_3ailgWXjiP_WPM24J3IhkB3xZ-bQ&s';

const FeedTextContent = ({ feedData }: FeedTextContentProps) => {
  const {
    username,
    profileUrl = DEFAULT_PROFILE,
    isFollow,
    createdAt,
    updatedAt,
    content,
    hashtags,
  } = feedData;
  return (
    <div className={styles.container}>
      <div className={styles.profile_wrapper}>
        <div className={styles.profile}>
          <div className={styles.profile_image}>
            <Image width="32" height="32" src={profileUrl} alt="user_profile" />
          </div>
          <p className={styles.username}>{username}</p>
          <p className={styles.feed_time}>
            {compactTimeFormatter(updatedAt ?? createdAt)}
          </p>
        </div>
        <div className={styles.profile_follow_btn}>
          <ProfileFollowButton size="small" isFollow={isFollow} />
        </div>
      </div>
      <p className={styles.feed_content}>{content}</p>
      <div className={styles.hashtag_wrapper}>
        {hashtags.map((hashtag) => (
          <p key={hashtag}>#{hashtag}</p>
        ))}
      </div>
    </div>
  );
};

export default FeedTextContent;
