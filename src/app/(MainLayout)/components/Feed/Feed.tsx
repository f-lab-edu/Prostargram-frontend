import { forwardRef } from 'react';
import styles from './Feed.module.scss';
import FeedTop from '../FeedTop/FeedTop';
import FeedBottom from '../FeedBottom/FeedBottom';
import FeedCenter from '../FeedCenter/FeedCenter';

type FeedProps = {
  feed: Feed.FeedData;
  feedIndex: number;
  setDetailFeedId: (feedId: number) => void;
};

const Feed = forwardRef<HTMLDivElement, FeedProps>(
  ({ feed, setDetailFeedId, feedIndex }, ref) => {
    return (
      <div ref={ref} className={styles.feed_container}>
        <FeedTop feed={feed} />
        <FeedCenter feedIndex={feedIndex} post={feed.post} />
        <FeedBottom setDetailFeedId={setDetailFeedId} feed={feed} />
      </div>
    );
  },
);

export default Feed;
