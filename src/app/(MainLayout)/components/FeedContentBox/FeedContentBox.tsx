'use client';

import { useRouter } from 'next/navigation';
import Typo from '@/components/common/Typo';
import { compactTimeFormatter } from '@/utils/formatter';
import clsx from 'clsx';
import styles from './FeedContentBox.module.scss';

type FeedContentBoxProps = {
  feed: Feed.FeedData;
  setDetailFeedId: (feedId: number) => void;
};
const FeedContentBox = ({ feed, setDetailFeedId }: FeedContentBoxProps) => {
  const router = useRouter();

  const onClickMoreButton = () => {
    setDetailFeedId(feed.post.postId);
    if (feed.post.postType === 'BASIC') {
      router.push(`?cf=${feed.post.postId}`);
    }
    if (feed.post.postType === 'DEBATE') {
      router.push('?df=1');
    }
  };

  return (
    <>
      <div className={styles.username_box}>
        <span className={styles.username}>{feed.basicUser.userName}</span>
        <Typo as="span" fontSize="body-14" color="gray-4">
          {compactTimeFormatter(feed.post.createdAt)}
        </Typo>
      </div>
      <div className={styles.content_wrapper}>
        <div className={clsx(styles.content_box, styles.two_ellipsis)}>
          <span
            className={styles.more}
            onClick={onClickMoreButton}
            aria-hidden="true"
          >
            더보기
          </span>
          {feed.post.content}
        </div>
      </div>
      <div className={styles.hashtag_box}>
        {feed.post.hashTagNames.map((hashtag) => (
          <span key={hashtag} className={styles.hashtag}>
            {hashtag}
          </span>
        ))}
      </div>
    </>
  );
};

export default FeedContentBox;
