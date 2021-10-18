import styled from '@emotion/styled';
import { History, LocationState } from 'history';
import { useState } from 'react';
import showMore from '../../assets/Button/show-more-btn.svg';

interface Props {
  className?: string;
  history: History<LocationState>;
  recommends: any[];
  changeKeyword: (arg0: string) => void;
  changePost: () => void;
}

const Container = styled.div`
  @media only screen and (max-width: 719px) {
    display: none;
  }

  display: flex;
  flex-direction: column;
  padding: 10px 16px;
  margin-top: 15px;
  border-radius: 8px;
  background-color: #f6f8fa;

  .recommend-title {
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

  .recommend-post {
    font-family: 'Roboto';
    margin-bottom: 20px;
    .post-title {
      width: 100%;
      margin: 0;
      text-decoration: none;
      z-index: 1;
      cursor: pointer;
      p {
        color: #333;
        font-weight: 700;
        font-size: 16px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
        margin-bottom: 5px;
        line-height: 1.2;
      }
    }
    .post-source {
      font-size: 11px;
      color: #999;
      z-index: 2;
    }
  }
`;

const Button = styled.button`
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00bdb8;
  font-size: 12px;
  font-weight: 500;
`;

const RecommendPostBanner = ({
  className,
  history,
  recommends,
  changeKeyword,
  changePost,
}: Props) => {
  const [lastIndex, setLastIndex] = useState(7);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const toBeRenderedPosts = recommends.slice(0, lastIndex);

  const handleShowMore = () => {
    if (lastIndex + 5 >= 20) {
      setLastIndex(20);
      setHasMorePosts(false);
    } else setLastIndex(lastIndex + 5);
  };

  return (
    <Container className={className}>
      <h3 className='recommend-title'>People Also Read</h3>
      {toBeRenderedPosts.map((post: any, index: number) => {
        const { hostname } = new URL(post.url);
        const encodedTitle = encodeURIComponent(
          post.title.replaceAll(' ', '-')
        );

        return (
          <div key={index} className='recommend-post'>
            <div
              className='post-title'
              onClick={() => {
                history.push(
                  `/liner.us/trusted-search/highlight/en/${post.document_id}/${encodedTitle}`
                );
                changePost();
              }}>
              <p>{post.title}</p>
            </div>
            <a
              className='post-source'
              href={post.url}
              target='_blank'
              rel='noreferrer'>
              {hostname}
            </a>
          </div>
        );
      })}
      {hasMorePosts && (
        <Button onClick={handleShowMore}>
          Show More
          <img src={showMore} alt='show more' />
        </Button>
      )}
    </Container>
  );
};

export default RecommendPostBanner;
