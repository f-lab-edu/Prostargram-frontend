import clsx from 'clsx';
import { CSSProperties, ReactNode } from 'react';

import styles from './Typo.module.scss';

const colors = {
  'primary-0': 'primary-0',
  'primary-1': 'primary-1',
  'primary-2': 'primary-2',
  'primary-3': 'primary-3',
  'primary-4': 'primary-4',
  'primary-5': 'primary-5',
  'gray-1': 'gray-1',
  'gray-2': 'gray-2',
  'gray-3': 'gray-3',
  'gray-4': 'gray-4',
  'gray-5': 'gray-5',
  'gray-6': 'gray-6',
  'gray-7': 'gray-7',
  'gray-8': 'gray-8',
  'gray-9': 'gray-9',
  white: 'white',
  yellow: 'yellow',
  red: 'red',
} as const;

const fontSizes = {
  'body-12': 'body-12',
  'body-14': 'body-14',
  'body-16': 'body-16',
  'body-20': 'body-20',
  'body-24': 'body-24',
  'body-28': 'body-28',
  'body-30': 'body-30',
  'body-32': 'body-32',
} as const;

interface TypoProps {
  children?: ReactNode;
  as: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3';
  fontSize?: keyof typeof fontSizes;
  color?: keyof typeof colors;
  underline?: boolean;
  textAlign?: CSSProperties['textAlign'];
  margin?: CSSProperties['margin'];
  marginTop?: CSSProperties['marginTop'];
  marginBottom?: CSSProperties['marginBottom'];
  marginLeft?: CSSProperties['marginLeft'];
  marginRight?: CSSProperties['marginRight'];
  cursor?: CSSProperties['cursor'];
}

const Typo = ({
  children,
  as: Component = 'span',
  fontSize = 'body-16',
  color = 'gray-1',
  textAlign,
  underline,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  cursor,
}: TypoProps) => {
  return (
    <Component
      style={{
        textAlign,
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        cursor,
        wordBreak: 'keep-all',
      }}
      className={clsx(styles.typography, styles[color], styles[fontSize], {
        [styles.underline]: underline,
      })}
    >
      {children}
    </Component>
  );
};

export default Typo;
