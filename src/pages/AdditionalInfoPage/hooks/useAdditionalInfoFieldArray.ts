import {
  Control,
  FieldArray,
  FieldArrayPath,
  FieldValues,
  useFieldArray,
} from 'react-hook-form';

interface useAdditionalInfoFieldArrayProps<
  TFieldValues extends FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues>,
> {
  name: TFieldArrayName;
  control: Control<TFieldValues>;
  fieldLimit: number;
}

const useAdditionalInfoFieldArray = <
  TFieldValues extends FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
>({
  name,
  control,
  fieldLimit,
}: useAdditionalInfoFieldArrayProps<TFieldValues, TFieldArrayName>) => {
  const { fields, append, remove, ...returns } = useFieldArray<TFieldValues>({
    name,
    control,
  });

  const appendField = (value: FieldArray<TFieldValues>) => {
    if (fields.length < fieldLimit) {
      append(value);
    }
  };

  const removeField = (index: number) => remove(index);

  return { fields, appendField, removeField, ...returns };
};

export default useAdditionalInfoFieldArray;
