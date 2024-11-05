import FeedWrapper from '@/components/common/FeedWrapper';

import styles from './page.module.scss';
import ReadOnlyCommonFeed from './components/ReadOnlyCommonFeed';
import Feed from './components/Feed/Feed';

const MOCK_BASIC_FEED_DATA = {
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

const MOCK_DEBATE_FEED_DATA = {
  post: {
    postId: 1,
    userId: 1,
    content: '토론피드 예시',
    hashTagNames: ['#java', '#javascript'],
    postType: 'DEBATE',
    likeCount: 1400,
    commentCount: 14,
    createdAt: '2024-11-03T04:46:36.490Z',
    isLike: false,
    isFollow: false,
    options: [
      {
        optionId: 1,
        optionContent: '오늘은 김치찌개다!',
        voteCount: 162452,
      },
      {
        optionId: 2,
        optionContent: '오늘은 된장찌개다!',
        voteCount: 31452,
      },
    ],
    selectedOptionId: 1,
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
      <Feed feed={MOCK_BASIC_FEED_DATA} />
      <Feed feed={MOCK_DEBATE_FEED_DATA} />
    </div>
  );
};
export default MainPage;
