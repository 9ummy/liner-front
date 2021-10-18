import styled from '@emotion/styled';
import closeButtonImage from '../../assets/Button/close-btn.svg';
import OAuthButtons from '../OAuthButtons/index';

interface Props {
  className?: string;
  handleModalClose: () => void;
}

const Container = styled.div`
  position: fixed;
  top: 15vh;
  left: calc(50vw - 200px);
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  width: 400px;
  padding: 20px;
  margin: auto;
  z-index: 20;
`;

const CloseButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TitleDiv = styled.div`
  padding: 0 15px;
  margin-bottom: 40px;
`;

const StyledOAuthButtons = styled(OAuthButtons)`
  height: 200px;
  padding: 0 15px;
`;

const SpanDiv = styled.div`
  display: inline-block;
  text-align: center;
  margin: 30px 0;
  letter-spacing: -0.4px;
  font-weight: 500;
  color: #787d86;
  font-size: 14px;
`;

const SignUpModal = ({ className, handleModalClose }: Props) => {
  return (
    <Container className={className}>
      <CloseButtonDiv>
        <button style={{ background: 'none' }} onClick={handleModalClose}>
          <img src={closeButtonImage} alt='close' />
        </button>
      </CloseButtonDiv>
      <TitleDiv>
        <h1>Sign Up</h1>
        <h1>to get the best results</h1>
      </TitleDiv>
      <StyledOAuthButtons type='Sign up' />
      <SpanDiv>
        <span style={{ marginRight: '5px' }}>Already have an account?</span>
        <span style={{ color: '#00bdb8', textDecoration: 'underline' }}>
          Sign in
        </span>
      </SpanDiv>
      <p
        style={{
          fontSize: '10px',
          color: '#787d86',
          margin: 'auto',
          marginBottom: '10px',
        }}>
        By continuing, you agree to LINER's{' '}
        <span style={{ fontWeight: 700, textDecoration: 'underline' }}>
          Terms of Service
        </span>{' '}
        and{' '}
        <span style={{ fontWeight: 700, textDecoration: 'underline' }}>
          Privacy Policy
        </span>
      </p>
    </Container>
  );
};

export default SignUpModal;
