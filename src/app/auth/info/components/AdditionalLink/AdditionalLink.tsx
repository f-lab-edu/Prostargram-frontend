import { KeyboardEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import Input from '@/components/common/Input';

import RemoveIcon from '@/assets/icons/close.svg';

import * as Styles from './AdditionalLink.css';

interface AdditionalLinkProps {
  index: number;
  removeHandler: (index: number) => void;
}

const AdditionalLink = ({ index, removeHandler }: AdditionalLinkProps) => {
  const { register } = useFormContext();

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
            className={Styles.removeLinkButton}
            onClick={() => removeHandler(index)}
            aria-label="remove-link"
          >
            <RemoveIcon />
          </button>
        )
      }
      {...register(`links.${index}.link`)}
    />
  );
};

export default AdditionalLink;
