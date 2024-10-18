import { DefaultValues, FieldValues, useForm } from 'react-hook-form';

interface UseAdditionalInfoPageProps<T> {
  defaultValues: DefaultValues<T>;
}

const useAdditionalInfoForm = <T extends FieldValues>({
  defaultValues,
}: UseAdditionalInfoPageProps<T>) => {
  const methods = useForm<T>({
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return {
    methods,
    ...methods,
    handleSubmit,
    errors,
  };
};

export default useAdditionalInfoForm;
