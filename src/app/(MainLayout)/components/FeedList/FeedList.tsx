'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { useInfiniteFeeds } from '@/api/feed/feedQueries';
import { MOCK_DATA_OF_DEBATE_FEED } from '@/data/mock';
import SkeletonFeed from '@/components/common/SkletonFeed/SkeletonFeed';

import Feed from '../Feed/Feed';
import ReadOnlyCommonFeed from '../ReadOnlyCommonFeed';
import ReadOnlyDebateFeed from '../ReadOnlyDebateFeed';

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
  const [detailFeedId, setDetailFeedId] = useState<string | null>(
    params.get('cf'),
  );

  useEffect(() => {
    setDetailFeedId(params.get('cf'));
  }, [params]);
  return (
    <>
      {isLoading && <SkeletonFeed />}
      {!isLoading &&
        feeds?.map((page) =>
          page.result?.data?.map((result, idx) => {
            return (
              <Feed
                ref={page.result?.data?.length === idx + 1 ? lastPostRef : null}
                key={result.post.postId}
                feed={result}
                feedIndex={idx}
              />
            );
          }),
        )}
      {detailFeedId && (
        <>
          <ReadOnlyCommonFeed feedId={detailFeedId} />
          <ReadOnlyDebateFeed debateFeedData={MOCK_DATA_OF_DEBATE_FEED} />
        </>
      )}
    </>
  );
};

export default FeedList;
