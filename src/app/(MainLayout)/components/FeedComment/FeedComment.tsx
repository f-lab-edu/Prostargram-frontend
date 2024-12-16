import Image from 'next/image';

import { compactTimeFormatter, digitNumberFormatter } from '@/utils/formatter';
import DefaultAvatar from '@/assets/icons/default_avatar.svg';
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
  comment: Comment.Common;
  user: Feed.BasicUser;
  feedId: string;
}

const FeedComment = ({ comment, user, feedId }: FeedCommentProps) => {
  return (
    <div
      className={
        comment.childrenCount > 0 ? styles.reply_container : styles.container
      }
    >
      <div className={styles.profile_wrapper}>
        <div className={styles.profile_nickname}>
          <div className={styles.profile}>
            {user.profileImgUrl ? (
              <Image
                src={user.profileImgUrl}
                width="32"
                height="32"
                alt="user-profile"
              />
            ) : (
              <DefaultAvatar />
            )}
          </div>
          <p>{user.userName}</p>
        </div>
        <LikeButton commentId={+comment.commentId} isLike={comment.isLike} />
      </div>
      <p className={styles.feed_content}>{comment.content}</p>

      <ToggleWrapper>
        {({ isToggle, toggleHandler }) => (
          <>
            <div className={styles.feed_coment_info}>
              <span>
                {compactTimeFormatter(comment.createdAt ?? comment.createdAt)}
              </span>
              <span>좋아요 {digitNumberFormatter(comment.likeCount)}개</span>
              <button
                className={styles.replay_write_button}
                onClick={toggleHandler}
              >
                답글 달기
              </button>
            </div>
            {isToggle && (
              <FeedReplyWriteInput
                feedId={feedId}
                commentId={String(comment.commentId)}
              />
            )}
          </>
        )}
      </ToggleWrapper>
    </div>
  );
};

export default FeedComment;
