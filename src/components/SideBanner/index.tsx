import styled from '@emotion/styled';
import { History, LocationState } from 'history';

interface Props {
  className?: string;
  history: History<LocationState>;
  recommends: string[];
  changeKeyword: (arg0: string) => void;
}

const Container = styled.div`
  @media only screen and (max-width: 719px) {
    display: none;
  }
  display: flex;
  flex-direction: column;
  padding: 10px 16px;
  border-radius: 8px;
  background-color: #f6f8fa;
  width: 100%;

  h3 {
    text-align: left;
    width: 100%;
    margin: 0;
    margin-bottom: 20px;
    padding-bottom: 5px;
    border-bottom: 1px solid #dde1e7;
    color: #969aa2;
    letter-spacing: -0.35px;
    font-size: 14px;
  }
`;

const RecommendContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  button {
    background: none;
    margin-bottom: 8px;
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 14px;
    letter-spacing: -0.35px;
    color: #555;
    cursor: pointer;

    :hover {
      color: #00bdb8;
      background-color: #eef1f4;
    }
  }
`;

const SideBanner = ({
  className,
  history,
  recommends,
  changeKeyword,
}: Props) => {
  return (
    <Container className={className}>
      <h3>People Also Searched For</h3>
      <RecommendContainer>
        {recommends.map((recommend: any, index: number) => {
          const encodedSearch = encodeURIComponent(
            recommend.replaceAll(' ', '-')
          );

          return (
            <button
              key={index}
              onClick={() => {
                history.push(`/liner.us/trusted-search/en/${encodedSearch}`);
                changeKeyword(recommend);
              }}>
              #{recommend}
            </button>
          );
        })}
      </RecommendContainer>
    </Container>
  );
};

export default SideBanner;
