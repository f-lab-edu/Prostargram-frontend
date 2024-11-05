import FeedWrapper from '@/components/common/FeedWrapper';

import styles from './page.module.scss';
import ReadOnlyCommonFeed from './components/ReadOnlyCommonFeed';
import Feed from './components/Feed/Feed';

const MOCK_MAIN_FEED_DATA = {
  post: {
    postId: 1,
    userId: 1,
    content:
      '오늘 깃허브에 알고리즘 관련 내용을 정리했습니다.오늘 깃허브에 알고리즘 관련 내용을 정리했습니다.오늘 깃허브에 알고리즘 관련 내용을 정리했습니다.오늘 깃허브에 알고리즘 관련 내용을 정리했습니다.오늘 깃허브에 알고리즘 관련 내용을 정리했습니다.오늘 깃허브에 알고리즘 관련 내용을 정리했습니다.오늘 깃허브에 알고리즘 관련 내용을 정리했습니다.오늘 깃허브에 알고리즘 관련 내용을 정리했습니다.오늘 깃허브에 알고리즘 관련 내용을 정리했습니다.오늘 깃허브에 알고리즘 관련 내용을 정리했습니다.오늘 깃허브에 알고리즘 관련 내용을 정리했습니다.오늘 깃허브에 알고리즘 관련 내용을 정리했습니다.오늘 깃허브에 알고리즘 관련 내용을 정리했습니다.',
    hashTagNames: ['#java', '#javascript'],
    postType: 'BASIC',
    likeCount: 1400,
    commentCount: 14,
    createdAt: '2024-11-03T04:46:36.490Z',
    isLike: false,
    isFollow: false,
    contentImageUrls: 'https://imageUrl.url',
    preSignedImageUrls: 'https://kr.object.ncloudstorage.com/postimage/~',
  },
  basicUser: {
    userId: 1,
    userName: '정민욱',
    profileImgUrl: 'https://profileImg.url',
  },
};

const MainPage = () => {
  return (
    <div className={styles.container}>
      <FeedWrapper>
        <ReadOnlyCommonFeed />
      </FeedWrapper>
      <Feed feed={MOCK_MAIN_FEED_DATA}>dd</Feed>
    </div>
  );
};

export default MainPage;
