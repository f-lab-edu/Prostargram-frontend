'use client';

import { useSearchParams } from 'next/navigation';

import FeedWrapper from '@/components/common/FeedWrapper';
import FeedLikeBox from '../FeedLikeBox';
import FeedTextContent from '../FeedTextContent';
import DebateContent, { DebateOptionType } from '../DebateContent';

import styles from './ReadOnlyDebateFeed.module.scss';

const MOCK_FEED_DATA = {
  username: 'seongjin',
  profileUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vkwPhD-NHO6sV_3ailgWXjiP_WPM24J3IhkB3xZ-bQ&s',
  isFollow: true,
  createdAt: '2024-10-25 20:08:22',
  updatedAt: '2024-10-28 21:29:22',
  content:
    '테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. \n테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. \n테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. \n테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. \n테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. \n테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. \n테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. \n테스트 입니다. ',
  hashtags: ['javascript', 'typescript', 'react'],
};

interface UserType {
  userId: number;
  userName: string;
  profileImgUrl: string;
}

interface DebateFeedType {
  post: {
    postType: 'DEBATE';
    postId: number;
    userId: number;
    content: string;
    hashTagNames: string[];
    likeCount: number;
    commentCount: number;
    createdAt: string;
    options: DebateOptionType[];
    selectedOptionId: number;
    isLike: boolean;
    isFollow: boolean;
  };
  basicUser: UserType;
}

interface ReadOnlyDebateFeedProps {
  debateFeedData: DebateFeedType;
}

const ReadOnlyDebateFeed = ({ debateFeedData }: ReadOnlyDebateFeedProps) => {
  console.log(debateFeedData);

  const feedId = new URLSearchParams(useSearchParams()).get('df');

  if (!feedId) {
    return null;
  }

  const [{ voteCount: firstVoteCount }, { voteCount: secondVoteCount }] =
    debateFeedData.post.options;

  const totalCount = firstVoteCount + secondVoteCount;
  const firstRatio = Math.floor((firstVoteCount / totalCount) * 100);
  const secondRatio = Math.floor((secondVoteCount / totalCount) * 100);

  return (
    <FeedWrapper modalMaxWidth={1_300} feedIdQuery="df">
      <div className={styles.container}>
        <div className={styles.left}>
          <DebateContent
            index={1}
            option={debateFeedData.post.options[0]}
            isSelected={
              debateFeedData.post.selectedOptionId ===
              debateFeedData.post.options[0].optionId
            }
            ratio={firstRatio}
          />
          <DebateContent
            index={2}
            option={debateFeedData.post.options[1]}
            isSelected={
              debateFeedData.post.selectedOptionId ===
              debateFeedData.post.options[1].optionId
            }
            ratio={secondRatio}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.right_up}>
            <FeedTextContent feedData={MOCK_FEED_DATA} />
          </div>
          <div className={styles.right_down} />
          <div>
            <FeedLikeBox postId={1} likeCount={14264} commentCount={30} />
          </div>
        </div>
      </div>
    </FeedWrapper>
  );
};

export default ReadOnlyDebateFeed;
