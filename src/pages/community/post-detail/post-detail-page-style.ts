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

const RecommendButtonBox = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 56px;
`;

const RecommendButton = styled.button`
  cursor: pointer;

  width: 174px;
  height: 48px;

  font-size: 1.6rem;
  font-weight: 700;

  border: 1px solid ${({ theme }) => theme.color.black_000000};
  border-radius: 54px;

  &:hover {
    color: ${({ theme }) => theme.color.white_FFFFFF};
    background-color: ${({ theme }) => theme.color.blue_43ADFF};
    border: 1px solid ${({ theme }) => theme.color.blue_43ADFF};
  }
`;

const LikeIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 32px;
  transform: translateY(-50%);

  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const LikeButtonText = styled.span`
  display: inline-block;

  width: 76px;
  height: 20px;
  margin-left: 18px;

  font-size: 1.6rem;
  font-weight: 700;
`;

const CommentArea = styled.section`
  display: flex;

  width: 1197px;
  margin: 0 auto;
  margin-top: 160px;
  padding-top: 60px;

  border-top: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};
`;

const ComentBox = styled.div`
  display: flex;
  gap: 25px;
  width: 100%;
`;

const ProfileImageWrapper = styled.div`
  overflow: hidden;
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const ProfileNickname = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

const ComentPostBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const ComentTextareaBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const ComentTextarea = styled.textarea`
  width: 100%;
  height: 138px;
  padding: 30px 37px;

  font-size: 1.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.gray_9E9E9E};

  background-color: ${({ theme }) => theme.color.gray_F9F9F9};
  border: 1px solid ${({ theme }) => theme.color.gray_F9F9F9};
  border-radius: 10px;

  &::placeholder {
    font-size: 1.8rem;
    font-weight: 500;
    color: ${({ theme }) => theme.color.gray_9E9E9E};
  }
`;

const ComentPostButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const ComentPostButton = styled.button`
  display: flex;

  padding: 10px 32px;

  font-size: 1.6rem;
  font-weight: 700;
  line-height: 20px;
  color: ${({ theme }) => theme.color.black_000000};

  border: 1px solid ${({ theme }) => theme.color.black_000000};
  border-radius: 6px;
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
  RecommendButtonBox,
  RecommendButton,
  LikeIconWrapper,
  LikeButtonText,
  CommentArea,
  ComentBox,
  ProfileImageWrapper,
  ProfileNickname,
  ComentPostBox,
  ComentTextareaBox,
  ComentTextarea,
  ComentPostButtonWrapper,
  ComentPostButton,
};
