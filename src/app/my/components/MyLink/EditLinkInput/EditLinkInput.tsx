import { ChangeEvent, ReactNode, useState } from 'react';

import { flexCenter } from '@/styles/common.css';
import * as Styles from './EditLinkInput.css';

const ICON_LIST = ['github', 'naver'];

interface EditLinkInputProps {
  link: string;
  children: (props: {
    editLinkInputValue: string;
    changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  }) => ReactNode;
}

const EditLinkInput = ({ link, children }: EditLinkInputProps) => {
  const [editLinkInputValue, setEditLinkInputValue] = useState<string>(link);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEditLinkInputValue(value);
  };

  const linkIcon =
    ICON_LIST.find((target) => editLinkInputValue.includes(target)) ||
    'default';

  return (
    <li className={Styles.editLinkInputWrapper}>
      <i className={flexCenter}>{linkIcon}</i>
      {children({ editLinkInputValue, changeHandler })}
    </li>
  );
};

export default EditLinkInput;
