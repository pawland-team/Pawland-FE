import { useEffect } from 'react';

/**
 * 특정 영역의 바깥 클릭시 닫힐 수 있도록 처리
 * @param ref 클릭해도 안닫히는 영역 (이 영역 외의 부분 클릭시 닫힘)
 * @param isOpened 닫고 싶은 영역의 열림 상태
 * @param setIsOpened 닫고 싶은 영역의 setState
 */

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
