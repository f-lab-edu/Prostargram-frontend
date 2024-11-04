import ReadOnlyCommonFeed from './components/ReadOnlyCommonFeed';
import ReadOnlyDebateFeed from './components/ReadOnlyDebateFeed';

import styles from './page.module.scss';

const MainPage = () => {
  return (
    <div className={styles.container}>
      메인
      <ReadOnlyCommonFeed />
      <ReadOnlyDebateFeed />
    </div>
  );
};

export default MainPage;
