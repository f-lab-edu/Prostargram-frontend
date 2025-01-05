'use client';

import { useCallback, useRef, useState } from 'react';

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

  const [detailFeedId, setDetailFeedId] = useState<number>();
  const [selectedFeedData, setSelectedFeedData] = useState<Feed.FeedData>();

  const showDetailFeed = (feedId: number) => {
    const allFeedData = data?.pages.map((pages) => pages.result?.data).flat();
    const feedData = allFeedData?.find((feed) => feed?.post.postId === feedId);

    setDetailFeedId(feedId);
    if (feedData) setSelectedFeedData(feedData);
  };

  return (
    <>
      {isLoading && <SkeletonFeed />}
      {!isLoading &&
        data?.pages?.map((page) => (
          <>
            {page.result?.data?.map((result, idx) => {
              return (
                <Feed
                  ref={
                    page.result?.data?.length === idx + 1 ? lastPostRef : null
                  }
                  key={result.post.postId}
                  feed={result}
                  feedIndex={idx}
                  setDetailFeedId={() => showDetailFeed(result.post.postId)}
                />
              );
            })}
          </>
        ))}
      {detailFeedId && selectedFeedData && (
        <>
          <ReadOnlyCommonFeed commonFeedData={selectedFeedData} />
          <ReadOnlyDebateFeed debateFeedData={MOCK_DATA_OF_DEBATE_FEED} />
        </>
      )}
    </>
  );
};

export default FeedList;
