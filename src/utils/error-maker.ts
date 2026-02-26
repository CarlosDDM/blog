type ErrorMaker<T> = {
  msg?: string[] | null[];
  situation?: string;
  formState: T;
};

export const errorMaker = <T>({
  formState,
  msg = [],
  situation = undefined,
}: ErrorMaker<T>) => {
  if (!msg) {
    return {
      formState,
      errors: [],
      success: situation,
    };
  }

  const erros = msg.filter(error => typeof error === 'string');

  return {
    formState,
    errors: erros,
    success: situation,
  };
};
