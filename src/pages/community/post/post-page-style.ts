import styled from 'styled-components';

const PostPage = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  margin-top: 126px;
`;

const HeaderArea = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 1197px;
  margin: 0 auto;
  padding-bottom: 24px;

  border-bottom: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};
`;

const HeaderTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
`;

const PostButton = styled.button`
  position: relative;

  align-items: center;

  height: 40px;
  padding: 10px 20px;

  color: ${({ theme }) => theme.color.white_FFFFFF};

  background-color: ${({ theme }) => theme.color.black_000000};
  border-radius: 6px;
`;

const PostButtonIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  display: flex;

  width: 18px;
  height: 18px;
`;

const buttonTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 96px;
  height: 20px;
  margin-left: 20px;
`;

export { PostPage, HeaderArea, HeaderTitle, PostButton, PostButtonIconWrapper, buttonTextWrapper };
