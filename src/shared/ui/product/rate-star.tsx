import styled from 'styled-components';

interface RateStarProps {
  rate: number;
}

const RateStar = ({ rate }: RateStarProps) => {
  if (rate === 1) {
    return <SRateStar>★ {rate}점</SRateStar>;
  }

  if (rate === 2) {
    return <SRateStar>★★ {rate}점</SRateStar>;
  }

  if (rate === 3) {
    return <SRateStar>★★★ {rate}점</SRateStar>;
  }

  if (rate === 4) {
    return <SRateStar>★★★★ {rate}점</SRateStar>;
  }

  if (rate === 5) {
    return <SRateStar>★★★★★ {rate}점</SRateStar>;
  }
};

export { RateStar };

const SRateStar = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 1.6rem;
`;
