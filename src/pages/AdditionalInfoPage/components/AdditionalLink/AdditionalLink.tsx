import { useFormContext } from 'react-hook-form';
import { KeyboardEvent } from 'react';

import Input from '@components/common/Input';

import Close from '@assets/icons/close.svg?react';
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
            <Close className={Styles.removeIcon} />
          </button>
        )
      }
      {...register(`links.${index}.link`)}
    />
  );
};

export default AdditionalLink;
