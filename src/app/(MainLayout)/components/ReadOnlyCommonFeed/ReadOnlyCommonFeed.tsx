'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import FeedWrapper from '@/components/common/FeedWrapper';
import { useGetDetailCommonFeed } from '@/api/feed/feedQueries';
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

  const { data } = useGetDetailCommonFeed(feedId!, {});

  useEffect(() => {
    console.log(commonFeedData);
  }, [commonFeedData]);

  if (!feedId) {
    return null;
  }

  return (
    <FeedWrapper feedIdQuery="cf">
      <div className={styles.container}>
        <div className={styles.left}>
          <Slide>
            {data?.result?.post &&
              'contentImageUrls' in data.result.post &&
              data.result.post.contentImageUrls.map((url, index) => (
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
            {data?.result?.post && (
              <FeedTextContent
                feedData={{
                  content: data.result.post.content,
                  createdAt: data.result.post.createdAt,
                  hashTagNames: data.result.post.hashTagNames,
                  isFollow: data.result.post.isFollow,
                  ...data?.result?.basicUser,
                }}
              />
            )}
          </div>
          <div className={styles.divider} />
          <div className={styles.right_down}>
            <FeedCommentList
              feedId={String(data?.result?.post?.postId)}
              feedCommentIds={['1', '2', '3']}
            />
          </div>
          {data?.result?.post && (
            <div>
              <FeedLikeBox
                postId={1}
                isLike={data.result.post.isLike}
                likeCount={data.result.post.likeCount}
                commentCount={data.result.post.commentCount}
              />
              <FeedCommentWriteInput postId={data.result.post.postId} />
            </div>
          )}
        </div>
      </div>
    </FeedWrapper>
  );
};

export default ReadOnlyCommonFeed;
