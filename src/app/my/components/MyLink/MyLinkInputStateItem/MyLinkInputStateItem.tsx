import { ChangeEvent, ReactNode, useState } from 'react';

import { flexCenter } from '@/styles/common.css';
import * as Styles from './MyLinkInputStateItem.css';

const ICON_LIST = ['github', 'naver'];

interface MyLinkInputStateItemProps {
  link: string;
  children: (props: {
    inputState: string;
    inputStateChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  }) => ReactNode;
}

const MyLinkInputStateItem = ({
  link,
  children,
}: MyLinkInputStateItemProps) => {
  const [inputState, setInputState] = useState<string>(link);

  const inputStateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputState(value);
  };

  const linkIcon =
    ICON_LIST.find((target) => inputState.includes(target)) || 'default';

  return (
    <div className={Styles.editLinkInputWrapper}>
      <i className={flexCenter}>{linkIcon}</i>
      {children({ inputState, inputStateChangeHandler })}
    </div>
  );
};

export default MyLinkInputStateItem;
