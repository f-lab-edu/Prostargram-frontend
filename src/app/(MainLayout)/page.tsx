'use client';

import { useCallback, useRef } from 'react';
import { useInfiniteFeeds } from '@/api/feed/feedQueries';
import ReadOnlyCommonFeed from './components/ReadOnlyCommonFeed';
import ReadOnlyDebateFeed from './components/ReadOnlyDebateFeed';
import styles from './page.module.scss';
import Feed from './components/Feed/Feed';
import FollowingList from './components/FollowingList/FollowingList';

const MOCK_DATA_OF_COMMON_FEED = {
  post: {
    postType: 'BASIC' as const,
    postId: 2,
    content:
      '테스트 내용 입니다. 테스트 내용 입니다. 테스트 내용 입니다. 테스트 내용 입니다. 테스트 내용 입니다. 테스트 내용 입니다. 테스트 내용 입니다. 테스트 내용 입니다. 테스트 내용 입니다. 테스트 내용 입니다. 테스트 내용 입니다. 테스트 내용 입니다. 테스트 내용 입니다.',
    hashTagNames: ['javascript', 'typescript'],
    likeCount: 0,
    commentCount: 0,
    createdAt: '2024-10-10T05:47:22.000+00:00',
    contentImageUrls: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vkwPhD-NHO6sV_3ailgWXjiP_WPM24J3IhkB3xZ-bQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vkwPhD-NHO6sV_3ailgWXjiP_WPM24J3IhkB3xZ-bQ&s',
    ],
    isLike: false,
    isFollow: false,
  },
  basicUser: {
    userId: 2,
    userName: 'kimchulsu',
    profileImgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vkwPhD-NHO6sV_3ailgWXjiP_WPM24J3IhkB3xZ-bQ&s',
  },
};

const MOCK_DATA_OF_DEBATE_FEED = {
  post: {
    postType: 'DEBATE' as const,
    postId: 1,
    content: '오늘의 점심 메뉴는?',
    hashTagNames: ['lunch', 'menu', 'bestmenu'],
    likeCount: 1_345_321,
    commentCount: 154_421,
    createdAt: '2024-11-02',
    options: [
      {
        optionId: 1,
        optionContent: '오늘은 김치찌개다!',
        voteCount: 162_452,
      },
      {
        optionId: 2,
        optionContent: '오늘은 된장찌개다!',
        voteCount: 31_452,
      },
    ],
    isFollow: false,
    isLike: true,
    selectedOptionId: 1,
  },
  basicUser: {
    userId: 2,
    userName: 'hongildong',
    profileImgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vkwPhD-NHO6sV_3ailgWXjiP_WPM24J3IhkB3xZ-bQ&s',
  },
};

const MOCK_DATA_OF_FOLLOWING_DATA = [
  {
    userId: 1,
    userName: '정민욱',
    profileImgUrl: 'https://profileImg1.url',
    departmentName: '네이버',
  },
  {
    userId: 2,
    userName: '제이슨',
    profileImgUrl: 'https://profileImg2.url',
    departmentName: '카카오',
  },
  {
    userId: 3,
    userName: '진성진',
    profileImgUrl: 'https://profileImg3.url',
    departmentName: '우아한형제들',
  },
  {
    userId: 1,
    userName: '정민욱',
    profileImgUrl: 'https://profileImg1.url',
    departmentName: '네이버',
  },
  {
    userId: 2,
    userName: '제이슨',
    profileImgUrl: 'https://profileImg2.url',
    departmentName: '카카오',
  },
  {
    userId: 3,
    userName: '진성진',
    profileImgUrl: 'https://profileImg3.url',
    departmentName: '우아한형제들',
  },
  {
    userId: 1,
    userName: '정민욱',
    profileImgUrl: 'https://profileImg1.url',
    departmentName: '네이버',
  },
  {
    userId: 2,
    userName: '제이슨',
    profileImgUrl: 'https://profileImg2.url',
    departmentName: '카카오',
  },
  {
    userId: 3,
    userName: '진성진',
    profileImgUrl: 'https://profileImg3.url',
    departmentName: '우아한형제들',
  },
];

const MainPage = () => {
  const observer = useRef<IntersectionObserver | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteFeeds(0);

  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      console.log('node', node);
      console.log(observer.current);

      if (isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        console.log('entries::', entries);
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  return (
    <div className={styles.container}>
      <FollowingList followingUsers={MOCK_DATA_OF_FOLLOWING_DATA} />
      {data?.pages?.map((page) => (
        <>
          {page.result?.map((result, idx) => {
            return (
              <Feed
                ref={page.result?.length === idx + 1 ? lastPostRef : null}
                key={result.post.postId}
                feed={result}
              />
            );
          })}
        </>
      ))}
      <ReadOnlyCommonFeed commonFeedData={MOCK_DATA_OF_COMMON_FEED} />
      <ReadOnlyDebateFeed debateFeedData={MOCK_DATA_OF_DEBATE_FEED} />
    </div>
  );
};
export default MainPage;
