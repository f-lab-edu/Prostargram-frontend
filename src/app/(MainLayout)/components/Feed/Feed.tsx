import styles from './Feed.module.scss';
import FeedTop from '../FeedTop/FeedTop';
import { MainFeed } from '../../types/feed';
import FeedBottom from '../FeedBottom/FeedBottom';
import BasicFeedContent from '../BasicFeedContent/BasicFeedContent';
import DebateFeedContent from '../DebateFeedContent/DebateFeedContent';

const MOCK_IMAGE_URL = [
  'https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG',
  'https://www.fitpetmall.com/wp-content/uploads/2023/10/shutterstock_1938687109-1.png',
  'https://health.chosun.com/site/data/img_dir/2024/06/07/2024060701516_0.jpg',
];

type FeedProps = {
  feed: MainFeed;
};

const Feed = ({ feed }: FeedProps) => {
  return (
    <div className={styles.feed_container}>
      {/* 상단 */}
      <FeedTop feed={feed} />
      {/* 중앙 */}
      <div className={styles.feed_center}>
        {feed.post.postType === 'BASIC' && (
          <BasicFeedContent images={MOCK_IMAGE_URL} />
        )}
        {feed.post.postType === 'DEBATE' && (
          <DebateFeedContent debate={feed.post} />
        )}
      </div>
      {/* 하단 */}
      <FeedBottom feed={feed} />
    </div>
  );
};

export default Feed;
