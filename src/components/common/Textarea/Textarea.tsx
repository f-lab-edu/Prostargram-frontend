import { TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Textarea.module.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea = ({ className, ...props }: TextareaProps) => {
  return <textarea className={clsx(styles.textarea, className)} {...props} />;
};

export default Textarea;
