'use client';

import { useSearchParams } from 'next/navigation';

import FeedWrapper from '@/components/common/FeedWrapper';
import Slide from '../Slide';
import FeedLikeBox from '../FeedLikeBox';
import FeedTextContent from '../FeedTextContent';
import FeedCommentList from '../FeedCommentList';
import FeedCommentWriteInput from '../FeedCommentWriteInput';

import styles from './ReadOnlyCommonFeed.module.scss';

const MOCK_FEED_DATA = {
  username: 'seongjin',
  profileUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vkwPhD-NHO6sV_3ailgWXjiP_WPM24J3IhkB3xZ-bQ&s',
  isFollow: true,
  createdAt: '2024-10-25 20:08:22',
  updatedAt: '2024-10-28 21:29:22',
  content:
    '테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. \n테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. \n테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. \n테스트 입니다. ',
  hashtags: ['javascript', 'typescript', 'react'],
};

const ReadOnlyCommonFeed = () => {
  const feedId = new URLSearchParams(useSearchParams()).get('cf');

  if (!feedId) {
    return null;
  }

  return (
    <FeedWrapper feedIdQuery="cf">
      <div className={styles.container}>
        <div className={styles.left}>
          <Slide>
            <div>111111111111111111111111111111111111111111111111111111</div>
            <div>222222222222222222222222222222222222222222222222222222</div>
            <div>333333333333333333333333333333333333333333333333333333</div>
          </Slide>
        </div>
        <div className={styles.right}>
          <div className={styles.right_up}>
            <FeedTextContent feedData={MOCK_FEED_DATA} />
          </div>
          <div className={styles.divider} />
          <div className={styles.right_down}>
            <FeedCommentList feedId="1" feedCommentIds={['1', '2', '3']} />
          </div>
          <div>
            <FeedLikeBox postId={1} likeCount={14264} commentCount={30} />
            <FeedCommentWriteInput postId={1} />
          </div>
        </div>
      </div>
    </FeedWrapper>
  );
};

export default ReadOnlyCommonFeed;
