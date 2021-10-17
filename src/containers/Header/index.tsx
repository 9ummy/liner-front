import styled from '@emotion/styled';
import { History, LocationState } from 'history';
import HeaderButton from '../../components/HeaderButton';
import Logo from '../../components/Logo';
import SearchBar from '../../components/SearchBar';

interface Props {
  className?: string;
  keyword: string;
  handleSignInModal: () => void;
  handleSignUpModal: () => void;
  onFocus: () => void;
  onBlur: () => void;
  changeKeyword: (arg0: string) => void;
  history: History<LocationState>;
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  background-color: white;
  margin-bottom: 20px;
  z-index: 2;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 20%;
  margin-left: 50px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 25%;
  margin-right: 50px;
`;

const StyledSearchBar = styled(SearchBar)`
  width: 50%;
`;

const SignInButton = styled(HeaderButton)`
  background-color: white;
  color: #00bdb8;
  margin-right: 10px;
`;

const SignUpButton = styled(HeaderButton)`
  background-color: #00bdb8;
  color: white;
`;

const Header = ({
  className,
  keyword,
  handleSignInModal,
  handleSignUpModal,
  onFocus,
  onBlur,
  changeKeyword,
  history,
}: Props) => {
  return (
    <HeaderContainer className={className}>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <StyledSearchBar
        keyword={keyword}
        onFocus={onFocus}
        onBlur={onBlur}
        history={history}
        changeKeyword={changeKeyword}
      />
      <ButtonContainer style={{ justifyContent: 'flex-end' }}>
        <SignInButton onClick={handleSignInModal}>Sign In</SignInButton>
        <SignUpButton onClick={handleSignUpModal}>Sign Up</SignUpButton>
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
