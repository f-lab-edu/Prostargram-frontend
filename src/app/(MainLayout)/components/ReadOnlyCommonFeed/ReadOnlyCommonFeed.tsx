'use client';

import { useSearchParams } from 'next/navigation';

import styles from './ReadOnlyCommonFeed.module.scss';
import FeedTextContent from '../FeedTextContent';

const MOCK_FEED_DATA = {
  username: 'seongjin',
  profileUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vkwPhD-NHO6sV_3ailgWXjiP_WPM24J3IhkB3xZ-bQ&s',
  isFollow: true,
  createdAt: '2024-10-25 20:08:22',
  updatedAt: '2024-10-28 21:29:22',
  content:
    '테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. 테스트 입니다. \n테스트 입니다. ',
  hashtags: ['javascript', 'typescript', 'react'],
};

const ReadOnlyCommonFeed = () => {
  const feedId = new URLSearchParams(useSearchParams()).get('f');

  if (!feedId) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>Left</div>
      <div className={styles.right}>
        <div>
          <FeedTextContent {...MOCK_FEED_DATA} />
        </div>
        <div>RightDown</div>
      </div>
    </div>
  );
};

export default ReadOnlyCommonFeed;
