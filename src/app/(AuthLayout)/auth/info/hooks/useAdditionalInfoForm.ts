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

  return methods;
};

export default useAdditionalInfoForm;
