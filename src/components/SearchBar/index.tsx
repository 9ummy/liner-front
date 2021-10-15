import styled from '@emotion/styled';
import { useState } from 'react';
import searchImage from '../../assets/Button/search-finder-btn.svg';

export interface Props {
  className?: string;

  keyword: string;
  onFocus: () => void;
  onBlur: () => void;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eef1f4;
  border-radius: 10px;
`;

const Input = styled.input`
  width: 80%;
  margin: 5px 15px 5px 15px;
  background: #eef1f4;
`;

const Button = styled.button`
  background: none;
  padding: 5px;
  margin: 5px;
  border-radius: 50%;
  :hover {
    background: #dadada;
  }
`;

const SearchBar = ({ className, keyword, onFocus, onBlur }: Props) => {
  const [search, setSearch] = useState(keyword);

  console.log(search);

  return (
    <Container className={className}>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <Button>
        <img src={searchImage} alt='search' />
      </Button>
    </Container>
  );
};

export default SearchBar;
