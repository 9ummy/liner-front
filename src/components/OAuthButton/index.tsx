import styled from '@emotion/styled';

interface Props {
  image: string;
  type: 'Sign in' | 'Sign up';
  service: 'Google' | 'Facebook' | 'Apple' | 'Twitter';
}

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 250px;
  padding: 11px;
  background-color: white;
  color: #787d86;
  border: 1px #dde1e7 solid;
  border-radius: 8px;
  font-size: 16px;
  :hover {
    background-color: #f6f8fa;
  }
`;

const ImgContainer = styled.div`
  margin-right: auto;
  margin-left: 10px;
  width: 15px;
  display: flex;
  justify-content: center;
`;

const OAuthButton = ({ image, type, service }: Props) => {
  return (
    <Container>
      <ImgContainer>
        <img src={image} alt='OAuth logo' />
      </ImgContainer>
      <span style={{ marginRight: 'auto' }}>
        {type} with {service}
      </span>
    </Container>
  );
};

export default OAuthButton;
