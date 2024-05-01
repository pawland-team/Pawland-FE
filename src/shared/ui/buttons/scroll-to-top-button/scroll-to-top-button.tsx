import * as S from './scroll-to-top-button-style';
import { RoundedArrowButton } from '../rounded-button/rounded-arrow-button';

const ScrollToTopButton = () => {
  const handleClickToTop = () => {};
  const handleClickToBottom = () => {};

  return (
    <S.ScrollToTopButtonBox>
      <RoundedArrowButton direction='up' handleClick={handleClickToTop} />
      <RoundedArrowButton handleClick={handleClickToBottom} />
    </S.ScrollToTopButtonBox>
  );
};

export { ScrollToTopButton };
