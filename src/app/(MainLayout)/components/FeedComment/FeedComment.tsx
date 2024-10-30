import Image from 'next/image';

import { compactTimeFormatter, digitNumberFormatter } from '@/utils/formatter';

import styles from './FeedComment.module.scss';
import LikeButton from '../LikeButton';

export type FeedCommentType = {
  commentId: string;
  nickname: string;
  profileUrl: string;
  feedContent: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  childFeedComments: string[];
};

interface FeedCommentProps {
  commentData: FeedCommentType;
}

const FeedComment = ({ commentData }: FeedCommentProps) => {
  const {
    // commentId,
    nickname,
    profileUrl,
    feedContent,
    createdAt,
    updatedAt,
    likeCount,
    childFeedComments,
  } = commentData;

  const isReply = !childFeedComments.length;

  return (
    <div className={isReply ? styles.reply_container : styles.container}>
      <div className={styles.profile_wrapper}>
        <div className={styles.profile_nickname}>
          <div className={styles.profile}>
            <Image src={profileUrl} width="32" height="32" alt="user-profile" />
          </div>
          <p>{nickname}</p>
        </div>
        <LikeButton postId={1} />
      </div>
      <p className={styles.feed_content}>{feedContent}</p>

      <div className={styles.feed_coment_info}>
        <span>{compactTimeFormatter(updatedAt ?? createdAt)}</span>
        <span>좋아요 {digitNumberFormatter(likeCount)}개</span>
        <span className={styles.replay_write_button}>답글 달기</span>
      </div>
    </div>
  );
};

export default FeedComment;
