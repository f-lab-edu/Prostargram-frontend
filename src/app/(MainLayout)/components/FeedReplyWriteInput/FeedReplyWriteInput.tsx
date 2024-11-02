'use client';

import { ChangeEvent } from 'react';

import useAutoResizeTextArea from '@/hooks/useAutoResizeTextArea';

import styles from './FeedReplyWriteInput.module.scss';

interface FeedReplyWriteInputProps {
  commentId: string;
}

const FeedReplyWriteInput = ({ commentId }: FeedReplyWriteInputProps) => {
  const { textareaRef, textareaContent, setTextareaContent } =
    useAutoResizeTextArea({ maxLine: 3, lineHeight: 20 });

  const textareaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setTextareaContent(value);
  };

  const replySubmitHandler = () => {
    console.log(commentId, textareaContent);
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
