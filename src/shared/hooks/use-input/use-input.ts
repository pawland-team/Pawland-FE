import { useState } from 'react';

export const useInput = <T>(initial: T, resetState?: T) => {
  const [input, setInput] = useState<T>(initial);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => {
      if (initial === null || typeof initial !== 'object') return value as T;

      // case 1. initial이 object였던 경우 && 이전 값이 object인 경우(null 포함).
      // case 2. clearInput으로 초기화 후 prev가 null 일 경우(null에 spread 써도 에러 안 뜸)
      if (typeof prev === 'object') {
        return { ...prev, [name]: value } as T;
      }

      return value as T;
    });
  };

  const clearInput = () => {
    if (resetState) setInput(resetState);
    else if (typeof initial === 'object') setInput(initial);
    else setInput('' as T);
  };

  return [input, onChange, clearInput] as const;
};
