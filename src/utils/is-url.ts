export const isUrl = (val: string) => {
  try {
    new URL(val);
    return true;
  } catch {
    return false;
  }
};
