import FeedContentBox from '../FeedContentBox/FeedContentBox';
import FeedCountBox from '../FeedCountBox/FeedCountBox';
import styles from './FeedBottom.module.scss';

type FeedBottomProps = {
  feed: Feed.FeedData;
  setDetailFeedId: (feedId: number) => void;
};

const FeedBottom = ({ feed, setDetailFeedId }: FeedBottomProps) => {
  return (
    <div className={styles.feed_bottom}>
      <FeedCountBox setDetailFeedId={setDetailFeedId} post={feed.post} />
      <FeedContentBox setDetailFeedId={setDetailFeedId} feed={feed} />
    </div>
  );
};

export default FeedBottom;
