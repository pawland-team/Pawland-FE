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
  padding-bottom: 21px;

  border-bottom: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};
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

const HeaderTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 22px;
`;

const RegionSpan = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

const HeaderTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
`;

const HeaderDate = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

const CommunityStatusBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const StatusText = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

const Divider = styled.div`
  width: 1px;
  height: 12px;
  margin: 0 12px;
  border-right: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};
`;

const ContentsArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 1197px;
  margin: 0 auto;
  padding-top: 60px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 31px;
  align-items: center;
  justify-content: center;
`;

const ContentsParagraph = styled.p`
  font-size: 2rem;
  font-weight: 400;
`;

export {
  PostDetailPage,
  HeaderArea,
  HeaderButtonBox,
  BacktoListButton,
  HeaderButtonText,
  HeaderTitleBox,
  RegionSpan,
  HeaderTitle,
  HeaderDate,
  CommunityStatusBox,
  StatusText,
  Divider,
  ContentsArea,
  Contents,
  ContentsParagraph,
};
