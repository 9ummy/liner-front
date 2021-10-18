import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { History, LocationState } from 'history';
import searchImage from '../../assets/Button/search-finder-btn.svg';

export interface Props {
  className?: string;

  keyword: string;
  onFocus: () => void;
  onBlur: () => void;
  changeKeyword: (arg0: string) => void;
  history: History<LocationState>;
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
  font-family: 'Roboto';
  font-weight: 400;
  ::placeholder {
    color: #787d86;
  }
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

const SearchBar = ({
  className,
  keyword,
  onFocus,
  onBlur,
  history,
  changeKeyword,
}: Props) => {
  const [search, setSearch] = useState(keyword);
  const encodedSearch = encodeURIComponent(search.replaceAll(' ', '-'));

  useEffect(() => {
    setSearch(keyword);
  }, [keyword]);

  return (
    <Container className={className}>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder='Search on LINER'
      />
      <Button
        onClick={() => {
          history.push(`/liner.us/trusted-search/en/${encodedSearch}`);
          changeKeyword(search);
        }}>
        <img src={searchImage} alt='search' />
      </Button>
    </Container>
  );
};

export default SearchBar;
