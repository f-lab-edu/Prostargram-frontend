import { KeyboardEvent } from 'react';

import Input from '@/components/common/Input';
import RemoveIcon from '@/assets/icons/close.svg';

import styles from './AdditionalLink.module.scss';

interface AdditionalLinkProps {
  index: number;
  id: string;
  removeHandler: (index: string) => void;
}

const AdditionalLink = ({ index, id, removeHandler }: AdditionalLinkProps) => {
  const keyupHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <Input
      type="text"
      placeholder="https://github.com/example"
      onKeyDown={keyupHandler}
      postfix={
        index !== 0 && (
          <button
            type="button"
            className={styles.remove_link_button}
            onClick={() => removeHandler(id)}
            aria-label="remove-link"
          >
            <RemoveIcon />
          </button>
        )
      }
    />
  );
};

export default AdditionalLink;
