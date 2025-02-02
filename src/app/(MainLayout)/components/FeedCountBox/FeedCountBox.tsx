'use client';

import { useRouter } from 'next/navigation';
import MessageIcon from '@/assets/icons/message.svg';
import { digitNumberFormatter } from '@/utils/formatter';
import LikeButton from '../LikeButton';
import styles from './FeedCountBox.module.scss';

type FeedCountBoxProps = {
  post: Feed.BasicPost | Feed.DebatePost | Feed.PollPost;
};

const FeedCountBox = ({ post }: FeedCountBoxProps) => {
  const router = useRouter();

  const onClickMessageIcon = () => {
    if (post.postType === 'BASIC') {
      router.push(`?cf=${post.postId}`);
    }
    if (post.postType === 'DEBATE') {
      router.push('?df=1');
    }
  };

  return (
    <div className={styles.count_box}>
      <LikeButton isLike={post.isLike} size="medium" postId={post.postId} />
      <div className={styles.like_count}>
        {digitNumberFormatter(post.likeCount)}
      </div>
      <MessageIcon onClick={onClickMessageIcon} />
      <span className={styles.comment_count}>
        {digitNumberFormatter(post.commentCount)}
      </span>
    </div>
  );
};

export default FeedCountBox;
