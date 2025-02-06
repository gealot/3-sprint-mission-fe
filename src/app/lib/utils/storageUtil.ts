// localStorage에 여러 개의 아이템을 가져오기
export const getMultipleLocalStorage = <T extends string>(
  keys: T[],
): Record<T, string | null> => {
  return keys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: localStorage.getItem(key),
    }),
    {} as Record<T, string | null>,
  );
};

// localStorage에 여러 개의 아이템을 저장하기
export const setMultipleLocalStorage = (
  items: Record<string, string>,
): void => {
  Object.entries(items).forEach(([key, value]) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting localStorage item ${key}:`, error);
    }
  });
};
