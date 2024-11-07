'use client';

import clsx from 'clsx';
import { Fragment, useEffect, useState } from 'react';

import If from '@/components/common/If';
import ToggleWrapper from '@/components/common/ToggleWrapper';
import FeedComment, { FeedCommentType } from '../FeedComment/FeedComment';

import styles from './FeedCommentList.module.scss';

const makeMockData = (id: number) => ({
  // eslint-disable-next-line no-plusplus
  commentId: Math.ceil(Math.random() * 6),
  nickname: `홍길동${id + 1}`,
  profileUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vkwPhD-NHO6sV_3ailgWXjiP_WPM24J3IhkB3xZ-bQ&s',
  feedContent:
    '내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 \n내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력',
  createdAt: '2024-10-25 20:08:22',
  updatedAt: '2024-10-28 21:29:22',
  likeCount: 1357345 + id,
  isLike: false,
  childFeedComments: +id < 4 ? [4, 5, 6] : [],
});

const asyncMockDataResponse = () => {
  return async (id: string) => {
    if (+id < 7) {
      return new Promise((res) => {
        const data = makeMockData(+id);
        res(data);
      });
    }

    return null;
  };
};

interface FeedCommentListProps {
  feedId?: string;
  commentId?: string;
  feedCommentIds: string[];
}

const FeedCommentList = ({
  feedId,
  commentId,
  feedCommentIds,
}: FeedCommentListProps) => {
  const [commentData, setCommentData] = useState<FeedCommentType[]>([]);

  useEffect(() => {
    (async function () {
      const requests = await feedCommentIds.map(await asyncMockDataResponse());
      const result = (await Promise.all(requests)) as FeedCommentType[];
      setCommentData(result);
    })();
  }, []);

  return (
    <div
      className={clsx(
        styles.container,
        feedId && styles.comment_container,
        commentId && styles.reply_container,
      )}
    >
      <If condition={!!feedId || !!commentId}>
        <If.True>
          {commentData.map((comment) => (
            <Fragment key={comment.commentId}>
              <FeedComment key={comment?.commentId} commentData={comment} />

              <If condition={Boolean(comment?.childFeedComments.length)}>
                <If.True>
                  <ToggleWrapper>
                    {({ isToggle, toggleHandler }) => (
                      <>
                        {!isToggle && (
                          <div className={styles.reply_comment}>
                            <div className={styles.horizon_line} />
                            <button
                              className={styles.reply_seeing_button}
                              onClick={toggleHandler}
                            >
                              답글 보기 ({comment.childFeedComments.length}
                              개)
                            </button>
                          </div>
                        )}

                        {isToggle && (
                          <FeedCommentList
                            key={comment.commentId}
                            commentId={comment.commentId}
                            feedCommentIds={comment.childFeedComments}
                          />
                        )}
                      </>
                    )}
                  </ToggleWrapper>
                </If.True>
              </If>
            </Fragment>
          ))}
        </If.True>
      </If>
    </div>
  );
};

export default FeedCommentList;
