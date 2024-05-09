import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

// TODO: 상품 등록 페이지 링크 걸어주기
const NoProductBox = () => {
  return (
    <SNoProductBox>
      <Image src='/images/no-product/no-product.svg' alt='상품 없음' width={178} height={98} />
      <p>아직 등록된 상품이 없습니다.</p>
      <Link href='/'>상품 등록을 해보세요!</Link>
    </SNoProductBox>
  );
};

export { NoProductBox };

export const SNoProductBox = styled.div`
  display: block;
  padding: 100px 0;
  text-align: center;

  p {
    margin-top: 35px;
    font-size: 1.8rem;
    color: ${({ theme }) => theme.color.gray_9E9E9E};
  }

  a {
    display: block;

    margin-top: 12px;

    font-size: 1.4rem;
    font-weight: 400;
    color: ${({ theme }) => theme.color.blue_43ADFF};

    &:hover {
      text-decoration: underline;
    }
  }
`;
