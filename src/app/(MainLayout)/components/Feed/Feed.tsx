import { ReactNode } from 'react';
import styles from './Feed.module.scss';
import FeedTop from '../FeedTop/FeedTop';
import { MainFeed } from '../../types/feed';
import FeedBottom from '../FeedBottom/FeedBottom';

type FeedProps = {
  children: ReactNode;
  feed: MainFeed;
};

const Feed = ({ children, feed }: FeedProps) => {
  return (
    <div className={styles.feed_container}>
      {/* 상단 */}
      <FeedTop feed={feed} />
      {/* 중앙 */}
      <div className={styles.feed_center}>{children}</div>
      {/* 하단 */}
      <FeedBottom feed={feed} />
    </div>
  );
};

export default Feed;
