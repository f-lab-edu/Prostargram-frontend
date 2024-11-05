import FeedWrapper from '@/components/common/FeedWrapper';

import styles from './page.module.scss';
import ReadOnlyCommonFeed from './components/ReadOnlyCommonFeed';

const MainPage = () => {
  return (
    <div className={styles.container}>
      메인
      <FeedWrapper>
        <ReadOnlyCommonFeed />
      </FeedWrapper>
    </div>
  );
};

export default MainPage;
