'use client';

import Image from 'next/image';

import FeedWrapper from '@/components/common/FeedWrapper';
import { useGetDetailCommonFeed } from '@/api/feed/feedQueries';
import Slide from '../Slide';
import FeedLikeBox from '../FeedLikeBox';
import FeedTextContent from '../FeedTextContent';
import FeedCommentList from '../FeedCommentList';
import FeedCommentWriteInput from '../FeedCommentWriteInput';

import styles from './ReadOnlyCommonFeed.module.scss';

interface ReadOnlyCommonFeedProps {
  feedId: string;
}

const ReadOnlyCommonFeed = ({ feedId }: ReadOnlyCommonFeedProps) => {
  const { data } = useGetDetailCommonFeed(feedId!, {
    enabled: feedId !== null,
  });

  const feedData = data?.result;

  return (
    <FeedWrapper feedIdQuery="cf">
      <div className={styles.container}>
        <div className={styles.left}>
          <Slide>
            {feedData?.post &&
              'contentImageUrls' in feedData.post &&
              feedData.post.contentImageUrls.map((url, index) => (
                <Image
                  key={url}
                  width="200"
                  height="400"
                  src={url}
                  alt={`content_image_${index}`}
                />
              ))}
          </Slide>
        </div>
        <div className={styles.right}>
          <div className={styles.right_up}>
            {feedData?.post && (
              <FeedTextContent
                feedData={{
                  content: feedData.post.content,
                  createdAt: feedData.post.createdAt,
                  hashTagNames: feedData.post.hashTagNames,
                  isFollow: feedData.post.isFollow,
                  ...feedData.basicUser,
                }}
              />
            )}
          </div>
          <div className={styles.divider} />
          <div className={styles.right_down}>
            <FeedCommentList feedId={feedId} feedCommentIds={['1', '2', '3']} />
          </div>
          {feedData?.post && (
            <div>
              <FeedLikeBox
                postId={feedData.post.postId}
                isLike={feedData.post.isLike}
                likeCount={feedData.post.likeCount}
                commentCount={feedData.post.commentCount}
              />
              <FeedCommentWriteInput postId={feedData.post.postId} />
            </div>
          )}
        </div>
      </div>
    </FeedWrapper>
  );
};

export default ReadOnlyCommonFeed;
