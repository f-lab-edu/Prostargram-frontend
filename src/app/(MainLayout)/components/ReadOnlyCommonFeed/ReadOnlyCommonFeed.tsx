'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import FeedWrapper from '@/components/common/FeedWrapper';
import { ReadOnlyCommonFeedType } from '../../types/feed';
import Slide from '../Slide';
import FeedLikeBox from '../FeedLikeBox';
import FeedTextContent from '../FeedTextContent';
import FeedCommentList from '../FeedCommentList';
import FeedCommentWriteInput from '../FeedCommentWriteInput';

import styles from './ReadOnlyCommonFeed.module.scss';

interface ReadOnlyCommonFeedProps {
  commonFeedData: ReadOnlyCommonFeedType;
}

const ReadOnlyCommonFeed = ({ commonFeedData }: ReadOnlyCommonFeedProps) => {
  const feedId = new URLSearchParams(useSearchParams()).get('cf');

  if (!feedId) {
    return null;
  }

  const { post, basicUser } = commonFeedData;

  return (
    <FeedWrapper feedIdQuery="cf">
      <div className={styles.container}>
        <div className={styles.left}>
          <Slide>
            {post.contentImageUrls.map((url, index) => (
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
            <FeedTextContent
              feedData={{
                content: post.content,
                createdAt: post.createdAt,
                hashTagNames: post.hashTagNames,
                isFollow: post.isFollow,
                ...basicUser,
              }}
            />
          </div>
          <div className={styles.divider} />
          <div className={styles.right_down}>
            <FeedCommentList feedId="1" feedCommentIds={['1', '2', '3']} />
          </div>
          <div>
            <FeedLikeBox
              postId={1}
              isLike={post.isLike}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
            />
            <FeedCommentWriteInput postId={post.postId} />
          </div>
        </div>
      </div>
    </FeedWrapper>
  );
};

export default ReadOnlyCommonFeed;
