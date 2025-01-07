'use client';

import clsx from 'clsx';
import { Fragment } from 'react';

import If from '@/components/common/If';
import ToggleWrapper from '@/components/common/ToggleWrapper';
import { useGetComments } from '@/api/comment/commentQueries';
import FeedComment from '../FeedComment/FeedComment';

import styles from './FeedCommentList.module.scss';

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
  const { data: comments } = useGetComments(Number(feedId), {});

  console.log(feedCommentIds);

  return (
    <div
      className={clsx(
        styles.container,
        feedId && styles.comment_container,
        commentId && styles.reply_container,
      )}
    >
      <If
        condition={
          (!!feedId || !!commentId) && comments?.result?.data !== undefined
        }
      >
        <If.True>
          {comments?.result?.data.map((commentRes) => (
            <Fragment key={commentRes.comment.commentId}>
              <FeedComment
                key={commentRes.comment.commentId}
                comment={commentRes.comment}
                user={commentRes.basicUser}
                feedId={feedId!}
              />
              <If condition={Boolean(commentRes.comment.childrenCount)}>
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
                              답글 보기 ({commentRes.comment.childrenCount}
                              개)
                            </button>
                          </div>
                        )}

                        {/* {isToggle && (
                          <FeedCommentList
                            key={commentRes.comment.commentId}
                            commentId={String(commentRes.comment.commentId)}
                            feedCommentIds={
                              commentRes.comment.childrenCount
                            }
                          />
                        )} */}
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
