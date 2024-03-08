import { useFormContext } from 'react-hook-form';

import Input from '@components/common/Input';

import Close from '@assets/icons/close.svg?react';
import * as Styles from './AdditionalLink.css';

interface AdditionalLinkProps {
  index: number;
  removeHandler: (index: number) => void;
}

const AdditionalLink = ({ index, removeHandler }: AdditionalLinkProps) => {
  const { register } = useFormContext();

  return (
    <Input
      type="text"
      placeholder="https://github.com/example"
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
