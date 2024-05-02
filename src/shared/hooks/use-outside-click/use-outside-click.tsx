import { useEffect } from 'react';

const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  isOpened: boolean,
  setIsOpened: (value: boolean) => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpened && ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpened(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, isOpened, setIsOpened]);

  return { ref, isOpened, setIsOpened };
};

export { useOutsideClick };
