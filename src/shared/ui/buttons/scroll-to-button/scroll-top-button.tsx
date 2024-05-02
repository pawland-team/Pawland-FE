import * as S from './scroll-to-button-style';
import { RoundedArrowButton } from '../rounded-arrow-button/rounded-arrow-button';

const ScrollToButton = () => {
  const handleClickToTop = () => {};
  const handleClickToBottom = () => {};

  return (
    <S.ScrollToButtonBox>
      <RoundedArrowButton direction='up' handleClick={handleClickToTop} />
      <RoundedArrowButton handleClick={handleClickToBottom} />
    </S.ScrollToButtonBox>
  );
};

export { ScrollToButton };
