import { useState } from 'react';

import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { flexCenter } from '@/styles/common.css';
import EditLinkInput from '../EditLinkInput';

import * as Styles from './EditMyLinks.css';

interface EditMyLinksProps {
  links: string[];
  onToggle: () => void;
}

const EditMyLinks = ({ links, onToggle }: EditMyLinksProps) => {
  const [myLinks, setMyLinks] = useState<string[]>(links);

  const addLink = () => {
    setMyLinks((prev) => [...prev, '']);
  };

  const removeLink = (target: string | number) => {
    setMyLinks((prev) =>
      prev.filter((link, index) =>
        typeof target === 'string' ? link !== target : index !== target,
      ),
    );
  };

  return (
    <>
      <ul className={Styles.iconWithMyLinkWrapper}>
        {myLinks.length === 0 && (
          <li>아래 + 버튼을 눌러 링크를 추가해보세요!</li>
        )}

        {myLinks.map((link, index) => (
          <EditLinkInput key={link || index} link={link}>
            {({ editLinkInputValue, changeHandler }) => (
              <>
                <Input
                  variants="noneBorder"
                  size="small"
                  name={`myLinks-${index}`}
                  className={Styles.myLinkInput}
                  onChange={changeHandler}
                  value={editLinkInputValue}
                />
                <Button
                  type="button"
                  fill="red"
                  className={`${flexCenter} ${Styles.removeButton}`}
                  onClick={() => removeLink(link || index)}
                >
                  X
                </Button>
              </>
            )}
          </EditLinkInput>
        ))}

        {myLinks.length < 3 && (
          <Button type="button" fill="white" size="small" onClick={addLink}>
            +
          </Button>
        )}
      </ul>

      <div className={Styles.editButtonWrapper}>
        <Button type="submit" className={Styles.editButton}>
          저장
        </Button>
        <Button type="button" className={Styles.editButton} onClick={onToggle}>
          취소
        </Button>
      </div>
    </>
  );
};

export default EditMyLinks;
