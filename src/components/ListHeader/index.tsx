import styled from '@emotion/styled';

interface Props {
  keyword: string;
  users: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  .list-header-title {
    margin-bottom: 15px;
    position: static;
    text-align: left;
  }
  span {
    color: #787d86;
  }
`;

const ListHeader = ({ keyword, users }: Props) => {
  return (
    <Container>
      <h1 className='list-header-title'>We found Trusted Results!</h1>
      <span>
        Trusted Results on '{keyword}' from '{users}' people.
      </span>
    </Container>
  );
};

export default ListHeader;
