import styled from '@emotion/styled';
import google from '../../assets/Auth/google-auth-logo.svg';
import apple from '../../assets/Auth/apple-auth-logo.svg';
import facebook from '../../assets/Auth/facebook-auth-logo.svg';
import twitter from '../../assets/Auth/twitter-auth-logo.svg';
import OAuthButton from '../OAuthButton';

interface Props {
  className?: string;
  type: 'Sign in' | 'Sign up';
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const OAuthButtons = ({ className, type }: Props) => {
  return (
    <Container className={className}>
      <OAuthButton type={type} service='Google' image={google} />
      <OAuthButton type={type} service='Facebook' image={facebook} />
      <OAuthButton type={type} service='Apple' image={apple} />
      <OAuthButton type={type} service='Twitter' image={twitter} />
    </Container>
  );
};

export default OAuthButtons;
