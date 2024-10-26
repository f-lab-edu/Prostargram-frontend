import FeedWrapper from '@/components/common/FeedWrapper';

import styles from './page.module.scss';

const MainPage = () => {
  return (
    <div className={styles.container}>
      메인
      <FeedWrapper>메롱</FeedWrapper>
    </div>
  );
};

export default MainPage;
