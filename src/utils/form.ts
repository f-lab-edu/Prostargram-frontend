export function getFormData<T extends string>(formData: FormData) {
  const nextFormData: Record<T, string> = {} as Record<T, string>;

  formData.forEach((value, key) => {
    if (typeof value === 'string') {
      nextFormData[key as T] = value;
    }
  });

  return nextFormData;
}
