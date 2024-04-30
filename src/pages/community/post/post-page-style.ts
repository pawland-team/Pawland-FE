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
  padding-bottom: 96px;
`;

const HeaderTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
`;

const ButtonArea = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const TempSaveButton = styled.button`
  align-items: center;
  justify-content: center;

  padding: 10px 32px;

  border: 1px solid ${({ theme }) => theme.color.black_000000};
  border-radius: 6px;
`;

const TempSaveButtonText = styled.div`
  width: 90px;
  font-size: 1.6rem;
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

const CategoryArea = styled.section`
  display: flex;
  justify-content: space-between;

  width: 1197px;
  margin: 0 auto;
  padding-bottom: 24px;

  border-bottom: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};
`;

const CategoryTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const CategoryTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
`;

const CategortyParagraph = styled.p`
  font-size: 2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

const RegionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 80px;
`;

const RegionSelectBoxTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

const RegionSelectBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  width: 700px;
  height: 85px;
`;

const RegionSelectItem = styled.div`
  align-items: center;
  justify-content: center;

  padding: 10px 20px;

  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray_9E9E9E};

  border: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};
  border-radius: 6px;
`;

const TitleInputArea = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 1197px;
  margin: 0 auto;
  padding-top: 80px;
  padding-bottom: 80px;

  border-bottom: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};
`;

const TitleInputTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
`;

const TitleInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 64px;
  padding: 20px 32px;

  background-color: ${({ theme }) => theme.color.gray_F9F9F9};
  border-radius: 6px;

  &::placeholder {
    font-size: 1.6rem;
    font-weight: 500;
    color: ${({ theme }) => theme.color.gray_BDBDBD};
  }
`;

const TitleInputCounter = styled.span`
  display: flex;
  justify-content: end;

  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

const TextEditorArea = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 1197px;
  margin: 0 auto;
  padding-top: 80px;
  padding-bottom: 80px;

  border-bottom: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};
`;

const TextEditorTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
`;

const PostThumnailImageArea = styled.section`
  display: flex;
  justify-content: space-between;

  width: 1197px;
  margin: 0 auto;
  padding-top: 80px;
  padding-bottom: 80px;
`;

const PostThumnailImageAreaTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PostThumnailImageAreaTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
`;

const PostThumnailImageAreaSubTitle = styled.span`
  font-size: 2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

const ThumnailUploadBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ThumnailUploadBoxTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

const ThumnailUploadBoxSubTitle = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

const UploadLabel = styled.label`
  cursor: pointer;

  position: relative;

  width: 686px;
  height: 200px;

  background-color: ${({ theme }) => theme.color.gray_F9F9F9};
  border-radius: 6px;
`;

const HideInput = styled.input`
  display: none;
`;

const UploadIconWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 20px;
  height: 20px;
`;

const UploadSpan = styled.span`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

export {
  PostPage,
  HeaderArea,
  HeaderTitle,
  ButtonArea,
  TempSaveButton,
  TempSaveButtonText,
  PostButton,
  PostButtonIconWrapper,
  buttonTextWrapper,
  CategoryArea,
  CategoryTitleBox,
  CategoryTitle,
  CategortyParagraph,
  RegionBox,
  RegionSelectBoxTitle,
  RegionSelectBox,
  RegionSelectItem,
  TitleInputArea,
  TitleInputBox,
  TitleInputTitle,
  TitleInput,
  TitleInputCounter,
  TextEditorArea,
  TextEditorTitle,
  PostThumnailImageArea,
  PostThumnailImageAreaTitleBox,
  PostThumnailImageAreaTitle,
  PostThumnailImageAreaSubTitle,
  ThumnailUploadBox,
  ThumnailUploadBoxTitle,
  ThumnailUploadBoxSubTitle,
  UploadLabel,
  HideInput,
  UploadIconWrapper,
  UploadSpan,
};
