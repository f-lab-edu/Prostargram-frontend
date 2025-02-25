'use client';

import FeedWrapper from '@/components/common/FeedWrapper';
import { useGetDetailDebateFeed } from '@/api/feed/feedQueries';
import FeedLikeBox from '../FeedLikeBox';
import FeedTextContent from '../FeedTextContent';
import DebateContent from '../DebateContent';

import styles from './ReadOnlyDebateFeed.module.scss';

interface ReadOnlyDebateFeedProps {
  feedId: string;
}

const ReadOnlyDebateFeed = ({ feedId }: ReadOnlyDebateFeedProps) => {
  const { data } = useGetDetailDebateFeed(feedId!, {
    enabled: feedId !== null,
  });

  const feedData = data?.result;

  // post가 DebatePost 타입인지 확인
  const isDebatePost = (
    post: Feed.BasicPost | Feed.DebatePost | Feed.PollPost,
  ): post is Feed.DebatePost => {
    return (post as Feed.DebatePost).options !== undefined;
  };

  // post가 없으면 바로 리턴, undefined 접근 방지
  if (!feedData?.post || !isDebatePost(feedData.post)) {
    return <FeedWrapper feedIdQuery="df">데이터 없음</FeedWrapper>;
  }

  const {
    options,
    selectedOptionId,
    postId,
    content,
    createdAt,
    hashTagNames,
    isFollow,
    isLike,
    likeCount,
    commentCount,
  } = feedData.post;
  const { userId, userName, profileImgUrl } = feedData.basicUser ?? {};

  const [
    { voteCount: firstVoteCount = 0 },
    { voteCount: secondVoteCount = 0 },
  ] = options ?? [{ voteCount: 0 }, { voteCount: 0 }];

  const totalCount = firstVoteCount + secondVoteCount || 1; // 0으로 나누는 것 방지
  const voteCountRatios = [
    Math.floor((firstVoteCount / totalCount) * 100),
    Math.floor((secondVoteCount / totalCount) * 100),
  ];

  const isNotSelectedYet = () => {
    if (options.length > 0) {
      return ![options[0]?.optionId, options[1]?.optionId].includes(
        selectedOptionId ?? 0,
      );
    }
    return true;
  };

  return (
    <FeedWrapper feedIdQuery="df">
      <div className={styles.container}>
        <div className={styles.left}>
          {options.map((option, index) => {
            const isSelected = selectedOptionId === option.optionId;
            return (
              <DebateContent
                key={option.optionId}
                index={index + 1}
                postId={postId ?? 0}
                option={option}
                ratio={voteCountRatios[index]}
                isSelected={isSelected}
                disabled={isNotSelectedYet() || isSelected}
              />
            );
          })}
        </div>
        <div className={styles.right}>
          <div className={styles.right_up}>
            {feedData?.post && feedData?.basicUser && (
              <FeedTextContent
                feedData={{
                  content: content ?? '',
                  createdAt: createdAt ?? '',
                  hashTagNames: hashTagNames ?? [],
                  isFollow: isFollow ?? false,
                  userId: userId ?? 0,
                  userName: userName ?? 'Unknown',
                  profileUrl: profileImgUrl ?? '',
                }}
              />
            )}
          </div>
          <div className={styles.right_down} />
          <div>
            <FeedLikeBox
              postId={postId ?? 0}
              isLike={isLike ?? false}
              likeCount={likeCount}
              commentCount={commentCount}
            />
          </div>
        </div>
      </div>
    </FeedWrapper>
  );
};

export default ReadOnlyDebateFeed;
