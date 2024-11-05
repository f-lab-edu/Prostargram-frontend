'use client';

import { ChangeEvent } from 'react';

import useAutoResizeTextArea from '@/hooks/useAutoResizeTextArea';

import styles from './FeedCommentWriteInput.module.scss';

const MAX_LENGTH = 1_000;

interface FeedCommentWriteInputProps {
  postId: number;
  parentId?: number;
  placeholder?: string;
  disabled?: boolean;
}

const FeedCommentWriteInput = ({
  postId,
  parentId,
  placeholder = '댓글 달기...',
  disabled,
}: FeedCommentWriteInputProps) => {
  const { textareaContent, setTextareaContent, textareaRef } =
    useAutoResizeTextArea({ maxLine: 3, lineHeight: 20 });

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value.length <= MAX_LENGTH) {
      setTextareaContent(value);
    }
  };

  const submitHandler = () => {
    console.log(postId, parentId);
    if (textareaContent) {
      console.log(textareaContent);
    }
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.comment_textarea}
        placeholder={placeholder}
        onChange={changeHandler}
        value={textareaContent}
        ref={textareaRef}
        disabled={disabled}
      />
      <button
        className={styles.submit_button}
        onClick={submitHandler}
        disabled={disabled}
      >
        게시
      </button>
    </div>
  );
};

export default FeedCommentWriteInput;
