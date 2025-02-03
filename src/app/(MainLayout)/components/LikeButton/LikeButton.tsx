'use client';

import HeartFillIcon from '@/assets/icons/heart-fill.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import { useDislikeFeed, useLikeFeed } from '@/api/feed/feedMutations';
import {
  useDislikeComment,
  useLikeComment,
} from '@/api/comment/commentMutations';
import clsx from 'clsx';
import { useQueryClient } from '@tanstack/react-query';
import { FEED_QUERY_KEYS } from '@/api/feed/feedQueries';
import styles from './LikeButton.module.scss';

interface LikeButtonProps {
  postId?: number;
  commentId?: number;
  isLike: boolean;
  size?: 'small' | 'medium';
}

const LikeButton = ({
  size = 'small',
  postId,
  commentId,
  isLike,
}: LikeButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate: likeFeedMutation } = useLikeFeed(postId!, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FEED_QUERY_KEYS.feeds,
      });
    },
  });
  const { mutate: dislikeFeedMutation } = useDislikeFeed(postId!, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FEED_QUERY_KEYS.feeds,
      });
    },
  });
  const { mutate: likeCommentMutation } = useLikeComment(commentId!);
  const { mutate: dislikeCommentMutation } = useDislikeComment(commentId!);

  const clickHandler = () => {
    if (postId) {
      if (isLike) {
        dislikeFeedMutation();
      }
      if (!isLike) {
        likeFeedMutation();
      }
    }

    if (commentId) {
      if (isLike) {
        dislikeCommentMutation();
      }
      if (!isLike) {
        likeCommentMutation();
      }
    }
  };

  return (
    <button
      className={clsx(styles.heart_icon, styles[size])}
      onClick={clickHandler}
    >
      {isLike ? <HeartFillIcon /> : <HeartIcon />}
    </button>
  );
};

export default LikeButton;
