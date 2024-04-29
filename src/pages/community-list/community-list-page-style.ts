import styled from 'styled-components';

const CommunityListPage = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const MainArea = styled.section`
  width: 1197px;
  margin-top: 126px;
`;

const HeaderArea = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin-bottom: 40px;
  padding-bottom: 24px;

  border-bottom: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};
`;

const HeaderTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
`;

const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 20px;
  width: 13px;
  height: 12px;
`;

const SearchBar = styled.input`
  width: 440px;
  height: 40px;
  padding: 6px 41px;

  border: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};
  border-radius: 30px;
`;

const NewPostButton = styled.button`
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
  margin-left: 10px;
`;

export {
  CommunityListPage,
  MainArea,
  HeaderArea,
  HeaderTitle,
  SearchBarContainer,
  SearchIconWrapper,
  SearchBar,
  NewPostButton,
  PostButtonIconWrapper,
  buttonTextWrapper,
};
