import { MainFeed } from '../../types/feed';
import FeedContentBox from '../FeedContentBox/FeedContentBox';
import FeedCountBox from '../FeedCountBox/FeedCountBox';
import styles from './FeedBottom.module.scss';

type FeedBottomProps = {
  feed: MainFeed;
};

const FeedBottom = ({ feed }: FeedBottomProps) => {
  return (
    <div className={styles.feed_bottom}>
      <FeedCountBox post={feed.post} />
      <FeedContentBox feed={feed} />
    </div>
  );
};

export default FeedBottom;
