'use client';

import { useRouter } from 'next/navigation';
import MessageIcon from '@/assets/icons/message.svg';
import { digitNumberFormatter } from '@/utils/formatter';
import { Post } from '../../types/feed';
import LikeButton from '../LikeButton';
import styles from './FeedCountBox.module.scss';

type FeedCountBoxProps = {
  post: Post;
};

const FeedCountBox = ({ post }: FeedCountBoxProps) => {
  const router = useRouter();

  const onClickMessageIcon = () => {
    router.push('?f=1');
  };

  return (
    <div className={styles.count_box}>
      <LikeButton size="medium" postId={post.postId} />
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
