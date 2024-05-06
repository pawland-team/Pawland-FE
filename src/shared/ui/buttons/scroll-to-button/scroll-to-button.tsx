import * as S from './scroll-to-button-style';
import { RoundedArrowButton } from '../rounded-arrow-button/rounded-arrow-button';

const ScrollToButton = () => {
  const handleClickToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleClickToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <S.ScrollToButtonBox>
      <RoundedArrowButton ButtonSize={36} arrowSize={18} direction='up' handleClick={handleClickToTop} />
      <RoundedArrowButton ButtonSize={36} arrowSize={18} handleClick={handleClickToBottom} />
    </S.ScrollToButtonBox>
  );
};

export { ScrollToButton };
