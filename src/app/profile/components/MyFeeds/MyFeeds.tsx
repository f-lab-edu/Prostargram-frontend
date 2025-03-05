'use client';

import { useGetProfileFeeds } from '@/api/profile/profileQuery';
import Feed from '@/app/(MainLayout)/components/Feed/Feed';
import ReadOnlyCommonFeed from '@/app/(MainLayout)/components/ReadOnlyCommonFeed';
import ReadOnlyDebateFeed from '@/app/(MainLayout)/components/ReadOnlyDebateFeed';
import SkeletonFeed from '@/components/common/SkletonFeed/SkeletonFeed';
import { MOCK_DATA_OF_DEBATE_FEED } from '@/data/mock';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

interface MyFeedsProps {
  userId: number;
}

const MyFeeds = ({ userId }: MyFeedsProps) => {
  const {
    data: feeds,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetProfileFeeds(userId);

  const params = useSearchParams();
  const [detailFeedId, setDetailFeedId] = useState<string | null>(
    params.get('cf'),
  );
  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    setDetailFeedId(params.get('cf'));
  }, [params]);

  return (
    <>
      {isLoading && <SkeletonFeed />}
      {!isLoading &&
        feeds?.map((feed, idx) => (
          <Feed
            ref={feeds.length === idx + 1 ? lastPostRef : null}
            key={feed.post.postId}
            feed={feed}
            feedIndex={idx}
          />
        ))}
      {detailFeedId && (
        <>
          <ReadOnlyCommonFeed feedId={detailFeedId} />
          <ReadOnlyDebateFeed debateFeedData={MOCK_DATA_OF_DEBATE_FEED} />
        </>
      )}
    </>
  );
};

export default MyFeeds;
