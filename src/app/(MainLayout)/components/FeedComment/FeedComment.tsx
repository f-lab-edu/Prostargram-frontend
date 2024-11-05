import Image from 'next/image';

import { compactTimeFormatter, digitNumberFormatter } from '@/utils/formatter';
import ToggleWrapper from '@/components/common/ToggleWrapper';
import LikeButton from '../LikeButton';
import FeedReplyWriteInput from '../FeedReplyWriteInput';

import styles from './FeedComment.module.scss';

export type FeedCommentType = {
  commentId: string;
  nickname: string;
  profileUrl: string;
  feedContent: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  isLike: boolean;
  childFeedComments: string[];
};

interface FeedCommentProps {
  commentData: FeedCommentType;
}

const FeedComment = ({ commentData }: FeedCommentProps) => {
  const {
    commentId,
    nickname,
    profileUrl,
    feedContent,
    createdAt,
    updatedAt,
    likeCount,
    isLike,
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
        <LikeButton commentId={+commentId} isLike={isLike} />
      </div>
      <p className={styles.feed_content}>{feedContent}</p>

      <ToggleWrapper>
        {({ isToggle, toggleHandler }) => (
          <>
            <div className={styles.feed_coment_info}>
              <span>{compactTimeFormatter(updatedAt ?? createdAt)}</span>
              <span>좋아요 {digitNumberFormatter(likeCount)}개</span>
              <button
                className={styles.replay_write_button}
                onClick={toggleHandler}
              >
                답글 달기
              </button>
            </div>
            {isToggle && <FeedReplyWriteInput commentId={commentId} />}
          </>
        )}
      </ToggleWrapper>
    </div>
  );
};

export default FeedComment;
