import { useRouter } from 'next/router';

import { CommonButton } from '@shared/ui/buttons';

const ProductDetailInfo = () => {
  const router = useRouter();

  const handleClickToChat = () => {
    router.push('/chat');
  };

  return (
    <>
      <div className='sub-info-container'>category / link copy</div>
      <div className='main-info-container'>
        <time>2024.12.10</time>
        <h2>제목</h2>
        <div className='seller-info-box'>
          <p>홍길동이</p>
          <div className='rate-box'>5점</div>
        </div>
        <div className='divide-line' />
        <h3>30,000원</h3>
      </div>
      <div className='button-container'>
        <CommonButton
          handleClick={handleClickToChat}
          backgroundColor='#43ADFF'
          fontColor='#fff'
          fontSize='24px'
          padding='16px'
          fontWeight='600'
        >
          채팅하기
        </CommonButton>
      </div>
    </>
  );
};

export { ProductDetailInfo };
