import { CSSProperties, ReactNode } from 'react';
import { vars } from '@styles/theme.css';
import * as Styles from './Typo.css';

interface TypoProps {
  children?: ReactNode;
  as: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3';
  fontSize?: keyof typeof vars.font;
  color?: keyof typeof vars.colors;
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
  fontSize,
  color,
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
      }}
      className={Styles.typography({
        fontSize,
        color,
        textDecoration: underline ? 'underline' : undefined,
      })}
    >
      {children}
    </Component>
  );
};

Typo.defaultProps = {
  as: 'span',
  fontSize: 'body-16',
  color: 'gray-1',
};

export default Typo;
