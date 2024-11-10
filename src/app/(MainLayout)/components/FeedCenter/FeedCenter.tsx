import BasicFeedContent from '../BasicFeedContent/BasicFeedContent';
import DebateFeedContent from '../DebateFeedContent/DebateFeedContent';
import styles from './FeedCenter.module.scss';

const MOCK_IMAGE_URL = [
  'https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG',
  'https://www.fitpetmall.com/wp-content/uploads/2023/10/shutterstock_1938687109-1.png',
  'https://health.chosun.com/site/data/img_dir/2024/06/07/2024060701516_0.jpg',
];

type FeedCenterProps = {
  post: Feed.BasicPost | Feed.DebatePost | Feed.PollPost;
};

const FeedCenter = ({ post }: FeedCenterProps) => {
  return (
    <div className={styles.feed_center}>
      {post.postType === 'BASIC' && (
        <BasicFeedContent images={MOCK_IMAGE_URL} />
      )}
      {post.postType === 'DEBATE' && <DebateFeedContent debate={post} />}
    </div>
  );
};

export default FeedCenter;
