import BasicFeedContent from '../BasicFeedContent/BasicFeedContent';
import DebateFeedContent from '../DebateFeedContent/DebateFeedContent';
import styles from './FeedCenter.module.scss';

type FeedCenterProps = {
  post: Feed.BasicPost | Feed.DebatePost | Feed.PollPost;
};

const FeedCenter = ({ post }: FeedCenterProps) => {
  return (
    <div className={styles.feed_center}>
      {post.postType === 'BASIC' && (
        <BasicFeedContent images={(post as Feed.BasicPost).contentImageUrls} />
      )}
      {post.postType === 'DEBATE' && (
        <DebateFeedContent debate={post as Feed.DebatePost} />
      )}
    </div>
  );
};

export default FeedCenter;
