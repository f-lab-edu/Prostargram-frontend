'use client';

import { useCallback, useRef, useState } from 'react';

import { useInfiniteFeeds } from '@/api/feed/feedQueries';
import { ALL_FEEDS, MOCK_DATA_OF_DEBATE_FEED } from '@/data/mock';
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
  const [selectedFeedData, setSelectedFeedData] = useState();

  const showDetailFeed = (feedId: number) => {
    const feedData = ALL_FEEDS.filter((feed) => feed.post.postId === feedId);

    setDetailFeedId(feedId);
    setSelectedFeedData(feedData[0]);
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

      {/* {ALL_FEEDS.map((feed, idx) => {
        return (
          <Feed
            ref={ALL_FEEDS.length === idx + 1 ? lastPostRef : null}
            key={feed.post.postId}
            feed={feed}
            setDetailFeedId={showDetailFeed}
          />
        );
      })} */}
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
