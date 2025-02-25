'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { useInfiniteFeeds } from '@/api/feed/feedQueries';
import SkeletonFeed from '@/components/common/SkletonFeed/SkeletonFeed';

import Feed from '../Feed/Feed';
import ReadOnlyCommonFeed from '../ReadOnlyCommonFeed';
import ReadOnlyDebateFeed from '../ReadOnlyDebateFeed';
import styles from './FeedList.module.scss';

const FeedList = () => {
  const observer = useRef<IntersectionObserver | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteFeeds();

  const feeds = data?.pages;

  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  const params = useSearchParams();
  const [detailCommonFeedId, setDetailCommonFeedId] = useState<string | null>(
    null,
  );
  const [detailDebateFeedId, setDetailDebateFeedId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const cf = params.get('cf');
    const df = params.get('df');

    if (cf) {
      setDetailCommonFeedId(cf);
      setDetailDebateFeedId(null);
    } else if (df) {
      setDetailDebateFeedId(df);
      setDetailCommonFeedId(null);
    } else {
      setDetailCommonFeedId(null);
      setDetailDebateFeedId(null);
    }
  }, [params]);
  return (
    <>
      {isLoading && <SkeletonFeed />}
      <div className={styles.feed_wrap}>
        {!isLoading &&
          feeds?.map((page) =>
            page.result?.data?.map((result, idx) => {
              return (
                <Feed
                  ref={
                    page.result?.data?.length === idx + 1 ? lastPostRef : null
                  }
                  key={result.post.postId}
                  feed={result}
                  feedIndex={idx}
                />
              );
            }),
          )}
      </div>
      {detailDebateFeedId && <ReadOnlyDebateFeed feedId={detailDebateFeedId} />}
      {detailCommonFeedId && <ReadOnlyCommonFeed feedId={detailCommonFeedId} />}
    </>
  );
};

export default FeedList;
