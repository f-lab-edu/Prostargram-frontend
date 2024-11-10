import styles from './Feed.module.scss';
import FeedTop from '../FeedTop/FeedTop';
import FeedBottom from '../FeedBottom/FeedBottom';
import FeedCenter from '../FeedCenter/FeedCenter';

type FeedProps = {
  feed: Feed.FeedsResponse;
};

const Feed = ({ feed }: FeedProps) => {
  return (
    <div className={styles.feed_container}>
      <FeedTop feed={feed} />
      <FeedCenter post={feed.post} />
      <FeedBottom feed={feed} />
    </div>
  );
};

export default Feed;
