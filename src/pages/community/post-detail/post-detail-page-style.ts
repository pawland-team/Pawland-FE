import styled from 'styled-components';

const PostDetailPage = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  margin-top: 104px;
`;

const HeaderArea = styled.section`
  display: flex;
  flex-direction: column;
  width: 1197px;
  margin: 0 auto;
`;

const HeaderButtonBox = styled.div`
  margin-bottom: 48px;
`;

const BacktoListButton = styled.button`
  padding: 10px 32px;

  font-size: 1.6rem;
  font-weight: 700;

  border: 1px solid ${({ theme }) => theme.color.black_000000};
  border-radius: 6px;
`;

const HeaderButtonText = styled.span`
  display: inline-block;

  width: 110px;
  height: 20px;

  font-size: 1.6rem;
  font-weight: 700;
`;

export { PostDetailPage, HeaderArea, HeaderButtonBox, BacktoListButton, HeaderButtonText };
