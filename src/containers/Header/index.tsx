import styled from '@emotion/styled';
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
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  background-color: white;
  padding: 0 50px;
  margin-bottom: 20px;
  z-index: 0;
`;

const ItemContainer = styled.div`
  display: flex;
  width: 25%;
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
}: Props) => {
  return (
    <HeaderContainer className={className}>
      <ItemContainer style={{ justifyContent: 'flex-start' }}>
        <Logo />
      </ItemContainer>
      <StyledSearchBar keyword={keyword} onFocus={onFocus} onBlur={onBlur} />
      <ItemContainer style={{ justifyContent: 'flex-end' }}>
        <SignInButton onClick={handleSignInModal}>Sign In</SignInButton>
        <SignUpButton onClick={handleSignUpModal}>Sign Up</SignUpButton>
      </ItemContainer>
    </HeaderContainer>
  );
};

export default Header;
