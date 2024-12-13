'use client';

import { ChangeEvent } from 'react';

import useAutoResizeTextArea from '@/hooks/useAutoResizeTextArea';

import { useWriteReplyComment } from '@/api/comment/commentMutations';

import styles from './FeedReplyWriteInput.module.scss';

interface FeedReplyWriteInputProps {
  commentId: string;
  feedId: string;
}

const FeedReplyWriteInput = ({
  commentId,
  feedId,
}: FeedReplyWriteInputProps) => {
  const { textareaRef, textareaContent, setTextareaContent } =
    useAutoResizeTextArea({ maxLine: 3, lineHeight: 20 });

  const { mutate: writeReplyCommentMutation } = useWriteReplyComment(
    feedId,
    commentId,
    textareaContent,
  );

  const textareaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setTextareaContent(value);
  };

  const replySubmitHandler = () => {
    console.log(feedId, commentId, textareaContent);
    // TODO: 서버 확인 필요
    writeReplyCommentMutation();
  };

  return (
    <div className={styles.container}>
      <textarea
        ref={textareaRef}
        value={textareaContent}
        onChange={textareaChangeHandler}
      />
      <button onClick={replySubmitHandler}>게시</button>
    </div>
  );
};

export default FeedReplyWriteInput;
