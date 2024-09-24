import { useState } from 'react';

import If from '@/components/common/If';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { createUniqueId } from '@/utils/create';
import MyLinkInputStateItem from '../MyLinkInputStateItem';

import styles from './EditMyLinkList.module.scss';

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
      <If condition={myLinks.length === 0}>
        <If.True>
          <p>아래 + 버튼을 눌러 링크를 추가해보세요!</p>
        </If.True>
      </If>

      {myLinks.map(({ id, link }) => (
        <MyLinkInputStateItem key={id} link={link}>
          {({ inputState, inputStateChangeHandler }) => (
            <>
              <Input
                variants="noneBorder"
                size="small"
                name={`myLinks-${id}`}
                className={styles.my_link_input}
                onChange={inputStateChangeHandler}
                value={inputState}
              />
              <Button
                type="button"
                fill="red"
                size="none"
                className={styles.remove_button}
                onClick={() => removeLink(id)}
              >
                X
              </Button>
            </>
          )}
        </MyLinkInputStateItem>
      ))}

      <If condition={myLinks.length < 3}>
        <If.True>
          <Button type="button" fill="white" size="small" onClick={addLink}>
            +
          </Button>
        </If.True>
      </If>
    </li>
  );
};

export default EditMyLinkList;
