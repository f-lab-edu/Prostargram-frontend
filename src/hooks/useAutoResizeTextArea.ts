import { useEffect, useRef, useState } from 'react';

type useAutoResizeTextAreaParams = {
  maxLine: number;
  lineHeight: number;
};

const useAutoResizeTextArea = ({
  maxLine = 3,
  lineHeight = 20,
}: useAutoResizeTextAreaParams) => {
  const [textareaContent, setTextareaContent] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const element = textareaRef.current;
      const maxLimitHeight = lineHeight * maxLine;

      element.style.height = `${lineHeight}px`;

      const currentHeight = Math.min(element.scrollHeight, maxLimitHeight);
      element.style.height = `${currentHeight}px`;
    }
  }, [maxLine, lineHeight, textareaContent]);

  return { textareaContent, setTextareaContent, textareaRef };
};

export default useAutoResizeTextArea;
