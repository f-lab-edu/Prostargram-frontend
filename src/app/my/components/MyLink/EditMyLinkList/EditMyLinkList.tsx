import { useState } from 'react';

import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { flexCenter } from '@/styles/common.css';
import { createUniqueId } from '@/utils/create';
import MyLinkInputStateItem from '../MyLinkInputStateItem';

import * as Styles from './EditMyLinkList.css';

interface EditMyLinksProps {
  links: string[];
}

const EditMyLinkList = ({ links }: EditMyLinksProps) => {
  const [myLinks, setMyLinks] = useState<{ id: string; link: string }[]>(
    links.map((link) => ({ id: createUniqueId(), link })),
  );

  const addLink = () => {
    setMyLinks((prev) => [...prev, { id: createUniqueId(), link: '' }]);
  };

  const removeLink = (target: string) => {
    setMyLinks((prev) => prev.filter(({ id }) => id !== target));
  };

  return (
    <li>
      {myLinks.length === 0 && <p>아래 + 버튼을 눌러 링크를 추가해보세요!</p>}

      {myLinks.map(({ id, link }) => (
        <MyLinkInputStateItem key={id} link={link}>
          {({ inputState, inputStateChangeHandler }) => (
            <>
              <Input
                variants="noneBorder"
                size="small"
                name={`myLinks-${id}`}
                className={Styles.myLinkInput}
                onChange={inputStateChangeHandler}
                value={inputState}
              />
              <Button
                type="button"
                fill="red"
                className={`${flexCenter} ${Styles.removeButton}`}
                onClick={() => removeLink(id)}
              >
                X
              </Button>
            </>
          )}
        </MyLinkInputStateItem>
      ))}

      {myLinks.length < 3 && (
        <Button type="button" fill="white" size="small" onClick={addLink}>
          +
        </Button>
      )}
    </li>
  );
};

export default EditMyLinkList;
