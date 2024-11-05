import styles from './FeedTop.module.scss';
import { MainFeed } from '../../types/feed';
import FeedMenu from '../FeedMenu/FeedMenu';
import FeedProfile from '../FeedProfile/FeedProfile';

type FeedTopProps = {
  feed: MainFeed;
};

const FeedTop = ({ feed }: FeedTopProps) => {
  return (
    <div className={styles.feed_top}>
      <FeedProfile userInfo={feed.basicUser} />
      <FeedMenu post={feed.post} />
    </div>
  );
};

export default FeedTop;
