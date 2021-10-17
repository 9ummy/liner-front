import styled from '@emotion/styled';

interface Props {
  keyword: string;
  users: number;
}

const Container = styled.div`
  width: 50%;
  margin: auto;
  margin-bottom: 20px;
`;

const ListHeader = ({ keyword, users }: Props) => {
  return (
    <Container>
      <h1 style={{ marginBottom: '15px' }}>We found Trusted Results!</h1>
      <span style={{ color: '#787d86' }}>
        Trusted Results on '{keyword}' from '{users}' people.
      </span>
    </Container>
  );
};

export default ListHeader;
