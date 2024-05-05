import Link from 'next/link';
import { styled } from 'styled-components';

import UnFilledSignatureLogo from '@/public/images/logo/signature-logo-unfilled-w90-h122-.svg?component';

export const SignatureLogo = styled(UnFilledSignatureLogo)`
  width: 88.95px;
  height: 121.448px;
  stroke: ${({ theme: { color } }) => color.gray_BDBDBD};

  & [fill='current'] {
    fill: ${({ theme: { color } }) => color.gray_BDBDBD};
  }

  &:hover {
    stroke: ${({ theme: { color } }) => color.blue_43ADFF};

    & [fill='current'] {
      fill: ${({ theme: { color } }) => color.blue_43ADFF};
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 282px;
  height: 197.45px;

  &:hover {
    ${SignatureLogo} {
      stroke: ${({ theme: { color } }) => color.blue_43ADFF};

      & [fill='current'] {
        fill: ${({ theme: { color } }) => color.blue_43ADFF};
      }
    }
  }
`;

export const Text = styled.p`
  margin-top: 8px;

  /* width: 282px; */

  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.8rem; /* 175% */
  color: ${({ theme: { color } }) => color.gray_9E9E9E};
  text-align: center;
  letter-spacing: -0.06rem;
`;

export const LinkToProductPage = styled(Link)`
  margin-top: 20px;

  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2rem; /* 125% */
  color: ${({ theme: { color } }) => color.black_000000};
  text-align: center;
  text-decoration: underline;
  text-underline-offset: 0.125em;
`;
