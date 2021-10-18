import { useState } from 'react';
import { useHistory } from 'react-router';
import styled from '@emotion/styled';
import back from '../../assets/Button/back-btn.svg';
import bookmark from '../../assets/Button/bookmark-btn.svg';
import share from '../../assets/Button/share-btn.svg';
import defaultFavicon from '../../assets/Favicon/default-favicon.svg';
import highlight from '../../assets/Highlight/bling.svg';

interface Props {
  post: any;
  handleSignUpModal: () => void;
}

const Container = styled.div`
  @media only screen and (max-width: 719px) {
    min-width: 320px;
  }
  @media only screen and (max-width: 850px) {
    min-width: 320px;
  }
  margin-bottom: 100px;

  .highlight-title {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    img {
      width: 12px;
      margin-right: 5px;
    }
    h3 {
      display: inline-block;
      font-size: 14px;
      color: #969aa2;
    }
  }
  .highlight {
    padding-left: 10px;
    border-left: 3px solid #00bdb8;
    margin-bottom: 20px;
    color: #555;
    line-height: 1.43;
    font-weight: 500;
  }
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 60px;
  padding-bottom: 20px;
`;

const PageButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ToolContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Tooltip = styled.div`
  margin: auto;
  padding: 3px 4px;
  background: #53565c;
  border-radius: 3px;
  color: white;
  font-size: 11px;
`;

const Button = styled.button`
  background: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  :hover {
    background-color: #f6f8fa;
  }
  img {
    margin: 5px;
    object-fit: cover;
  }
`;

const PostTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  a {
    display: flex;
  }
  img {
    width: 100%;
    height: 250px;
    border-radius: 4px;
    margin-right: 10px;
    object-fit: cover;
  }
  h1 {
    margin: 20px 0;
    font-size: 24px;
  }
  .page-source {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #eef1f4;
    margin-bottom: 30px;
    img {
      width: 20px;
      height: 20px;
    }
  }
`;

const ViewOriginalButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 11px;
  background-color: white;
  color: #787d86;
  border: 1px #dde1e7 solid;
  border-radius: 8px;
  font-size: 14px;
  margin: 40px 0;
  cursor: pointer;
  text-decoration: none;
  letter-spacing: -0.35px;
  :hover {
    background-color: #f6f8fa;
  }
`;

const PostInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 20px;
  span {
    display: block;
    color: #969aa2;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: -0.35px;
    width: 114px;
    line-height: 1.5;
  }
  p {
    width: 100%;
    color: #555;
    line-height: 1.5;
    font-family: 'Roboto';
    font-weight: 400;
  }
`;

const DetailPost = ({
  post: {
    title,
    description,
    image_url,
    url,
    favicon_url,
    phrases,
    country,
    author,
  },
  handleSignUpModal,
}: Props) => {
  const history = useHistory();
  const [isOnBookmark, setOnBookmark] = useState(false);
  const [isOnShare, setOnShare] = useState(false);

  favicon_url = favicon_url || defaultFavicon;
  const { hostname } = new URL(url);

  const handleImageError = (e: any) => {
    e.target.style.display = 'none';
  };

  const handleFaviconError = (e: any) => {
    e.target.src = defaultFavicon;
  };

  return (
    <Container>
      <PostHeader>
        <Button onClick={() => history.goBack()}>
          <img src={back} alt='go back' />
        </Button>
        <PageButtonContainer>
          <ToolContainer>
            {isOnBookmark ? (
              <Tooltip style={{ visibility: 'visible' }}>save</Tooltip>
            ) : (
              <Tooltip style={{ visibility: 'hidden' }}>save</Tooltip>
            )}
            <Button
              onMouseOver={() => setOnBookmark(true)}
              onMouseLeave={() => setOnBookmark(false)}
              onClick={handleSignUpModal}>
              <img src={bookmark} alt='bookmark' />
            </Button>
          </ToolContainer>
          <ToolContainer>
            {isOnShare ? (
              <Tooltip style={{ visibility: 'visible' }}>share</Tooltip>
            ) : (
              <Tooltip style={{ visibility: 'hidden' }}>share</Tooltip>
            )}
            <Button
              onMouseOver={() => setOnShare(true)}
              onMouseLeave={() => setOnShare(false)}
              onClick={handleSignUpModal}>
              <img src={share} alt='share' />
            </Button>
          </ToolContainer>
        </PageButtonContainer>
      </PostHeader>
      <PostTitleContainer>
        {image_url && (
          <img
            src={image_url}
            alt='post thumbnail'
            onError={handleImageError}
          />
        )}
        <h1>{title}</h1>
        <div className='page-source'>
          <a href={url} target='_blank' rel='noreferrer'>
            <img
              style={{ width: '20px' }}
              src={favicon_url}
              onError={handleFaviconError}
              alt='post favicon'
            />
          </a>
          <a
            style={{ fontSize: '11px' }}
            href={url}
            target='_blank'
            rel='noreferrer'>
            {hostname}
          </a>
        </div>
      </PostTitleContainer>
      <div className='highlight-title'>
        <img src={highlight} alt='highlight' />
        <h3>Popular Highlights</h3>
      </div>
      {phrases.map((phrase: any, index: number) => {
        return (
          <p key={index} className='highlight'>
            {phrase.text}
          </p>
        );
      })}
      <ViewOriginalButton href={url} target='_blank'>
        View Original
      </ViewOriginalButton>
      {country && (
        <PostInfo>
          <span>Country</span>
          <p>{country}</p>
        </PostInfo>
      )}
      {description && (
        <PostInfo>
          <span>Description</span>
          <p>{description}</p>
        </PostInfo>
      )}
      {author && (
        <PostInfo>
          <span>Author</span>
          <p>{author}</p>
        </PostInfo>
      )}
    </Container>
  );
};

export default DetailPost;
