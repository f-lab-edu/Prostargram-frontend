'use client';

import { useEffect, useState } from 'react';

import If from '@/components/common/If';
import ToggleWrapper from '@/components/common/ToggleWrapper';
import FeedComment, { FeedCommentType } from '../FeedComment/FeedComment';

import styles from './FeedCommentList.module.scss';

const asyncMockDataResponse = async () => {
  let uniqueId = 1;
  return async (id: string) => {
    if (uniqueId < 4) {
      return new Promise((res) => {
        const data = {
          // eslint-disable-next-line no-plusplus
          commentId: (uniqueId++).toString(),
          nickname: `홍길동${id + 1}`,
          profileUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vkwPhD-NHO6sV_3ailgWXjiP_WPM24J3IhkB3xZ-bQ&s',
          feedContent:
            '내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 \n내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력',
          createdAt: '2024-10-25 20:08:22',
          updatedAt: '2024-10-28 21:29:22',
          likeCount: 1357345 + id,
          childFeedComments: +id < 4 ? [4, 5, 6] : [],
        };

        res(data);
      });
    }

    return null;
  };
};

interface FeedCommentListProps {
  feedId?: string;
  feedCommentIds: string[];
}

const FeedCommentList = ({ feedId, feedCommentIds }: FeedCommentListProps) => {
  const [commentData, setCommentData] = useState<FeedCommentType[]>([]);

  useEffect(() => {
    (async function () {
      const result = (await Promise.all(
        feedCommentIds.map(await asyncMockDataResponse()),
      )) as FeedCommentType[];
      setCommentData(result);
    })();
  }, []);

  return (
    <div className={feedId ? styles.container : styles.container_non_padding}>
      <If condition={Boolean(feedId)}>
        {commentData.map((feedComment) => (
          <>
            <FeedComment
              key={feedComment.commentId}
              commentData={feedComment}
            />

            <If condition={Boolean(feedComment.childFeedComments.length)}>
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
                            답글 보기 ({feedComment.childFeedComments.length}개)
                          </button>
                        </div>
                      )}

                      {isToggle && (
                        <FeedCommentList
                          key={feedComment.commentId}
                          feedCommentIds={feedComment.childFeedComments}
                        />
                      )}
                    </>
                  )}
                </ToggleWrapper>
              </If.True>
            </If>
          </>
        ))}
      </If>
    </div>
  );
};

export default FeedCommentList;
