import Lottie from 'react-lottie-player';

import styled from 'styled-components';

import loadingLottie from './loading.json';

interface NonFixedLoadingProps {
  minusHeight?: string;
}

export const NonFixedLoading = ({ minusHeight }: NonFixedLoadingProps) => {
  return (
    <S.Wrap $minusHeight={minusHeight}>
      <Lottie loop animationData={loadingLottie} play />
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div<{ $minusHeight?: string }>`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: ${({
      $minusHeight,
      theme: {
        blockSize: { globalNavBar },
      },
    }) => `calc(100vh - ${$minusHeight || globalNavBar.onDesktop.height})`};

    background: rgba(255 255 255 / 90%);

    & > div {
      width: 400px;
      height: 400px;
    }
  `,
};
