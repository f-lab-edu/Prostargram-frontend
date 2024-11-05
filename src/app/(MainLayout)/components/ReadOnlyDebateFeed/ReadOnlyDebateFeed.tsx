'use client';

import { useSearchParams } from 'next/navigation';

import FeedWrapper from '@/components/common/FeedWrapper';
import { ReadOnlyDebateFeedType } from '../../types/feed';
import FeedLikeBox from '../FeedLikeBox';
import FeedTextContent from '../FeedTextContent';
import DebateContent from '../DebateContent';

import styles from './ReadOnlyDebateFeed.module.scss';

interface ReadOnlyDebateFeedProps {
  debateFeedData: ReadOnlyDebateFeedType;
}

const ReadOnlyDebateFeed = ({ debateFeedData }: ReadOnlyDebateFeedProps) => {
  console.log(debateFeedData);

  const feedId = new URLSearchParams(useSearchParams()).get('df');

  if (!feedId) {
    return null;
  }

  const { post, basicUser } = debateFeedData;

  const [{ voteCount: firstVoteCount }, { voteCount: secondVoteCount }] =
    post.options;

  const totalCount = firstVoteCount + secondVoteCount;
  const voteCountRatios = [
    Math.floor((firstVoteCount / totalCount) * 100),
    Math.floor((secondVoteCount / totalCount) * 100),
  ];

  const notSelectedYet = ![
    post.options[0].optionId,
    post.options[1].optionId,
  ].includes(post.selectedOptionId);

  return (
    <FeedWrapper modalMaxWidth={1_300} feedIdQuery="df">
      <div className={styles.container}>
        <div className={styles.left}>
          {[0, 1].map((index) => {
            const isSelected =
              post.selectedOptionId === post.options[index].optionId;

            return (
              <DebateContent
                key={index}
                index={index + 1}
                postId={post.postId}
                option={post.options[index]}
                ratio={voteCountRatios[index]}
                isSelected={isSelected}
                disabled={notSelectedYet || isSelected}
              />
            );
          })}
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
          <div className={styles.right_down} />
          <div>
            <FeedLikeBox
              postId={post.postId}
              isLike={post.isLike}
              likeCount={14264}
              commentCount={30}
            />
          </div>
        </div>
      </div>
    </FeedWrapper>
  );
};

export default ReadOnlyDebateFeed;
