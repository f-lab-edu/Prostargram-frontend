import { useEffect, useRef, useState } from 'react';

type useAutoResizeTextAreaParams = {
  maxLine: number;
  lineHeight: number;
};

const useAutoResizeTextArea = ({
  maxLine = 3,
  lineHeight = 20,
}: useAutoResizeTextAreaParams) => {
  const [commentContent, setCommentContent] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const rowCount = textareaRef.current.value.split(/\r\n|\r|\n/).length;
      const target = textareaRef.current;

      if (rowCount < maxLine) {
        target.style.height = `${(rowCount * lineHeight).toString()}px`;
      } else {
        target.style.height = `${maxLine * lineHeight}px`;
      }
    }
  }, [maxLine, lineHeight, commentContent]);

  return { commentContent, setCommentContent, textareaRef };
};

export default useAutoResizeTextArea;
