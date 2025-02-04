import { ReactNode } from 'react';

import Field from '@/components/common/Field';

interface SignupFieldProps {
  htmlFor: string;
  label: string;
  emphasizeString?: string;
  content: ReactNode;
  errorMessage?: string;
}

const SignupField = ({
  htmlFor,
  label,
  emphasizeString,
  content,
  errorMessage,
}: SignupFieldProps) => {
  return (
    <Field>
      <Field.Label htmlFor={htmlFor}>
        {emphasizeString && (
          <Field.Emphasize>{emphasizeString}</Field.Emphasize>
        )}
        {label}
      </Field.Label>
      <Field.Box>{content}</Field.Box>
      {errorMessage && <Field.ErrorMessage>{errorMessage}</Field.ErrorMessage>}
    </Field>
  );
};

export default SignupField;
