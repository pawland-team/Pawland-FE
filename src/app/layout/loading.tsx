import Lottie from 'react-lottie-player';

import styled from 'styled-components';

import loadingLottie from './loading.json';

const Loading = () => {
  return (
    <SLoading>
      <Lottie loop animationData={loadingLottie} play />
    </SLoading>
  );
};

export { Loading };

const SLoading = styled.div`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.pageLoader};
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background: rgba(255 255 255 / 90%);

  & > div {
    width: 400px;
    height: 400px;
  }
`;
