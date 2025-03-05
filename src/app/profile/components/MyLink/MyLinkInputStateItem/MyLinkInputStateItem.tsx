import { ChangeEvent, ReactNode, useState } from 'react';

import { iconList } from '../iconData';

import styles from './MyLinkInputStateItem.module.scss';

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

  const linkIcon = iconList.find(({ name }) => inputState.includes(name)) || {
    name: 'default',
    icon: <span>P</span>,
  };

  return (
    <div className={styles.edit_link_input_wrapper}>
      <i>{linkIcon.icon}</i>
      {children({ inputState, inputStateChangeHandler })}
    </div>
  );
};

export default MyLinkInputStateItem;
