import styled from '@emotion/styled';
import defaultFavicon from '../../assets/Favicon/default-favicon.svg';
import thumb0 from '../../assets/Thumbnail/default-thumb-0.svg';
import thumb1 from '../../assets/Thumbnail/default-thumb-1.svg';
import thumb2 from '../../assets/Thumbnail/default-thumb-2.svg';
import thumb3 from '../../assets/Thumbnail/default-thumb-3.svg';
import thumb4 from '../../assets/Thumbnail/default-thumb-4.svg';
import thumb5 from '../../assets/Thumbnail/defuault-thumb-5.svg';
import bookmark from '../../assets/Button/bookmark-btn.svg';
import share from '../../assets/Button/share-btn.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const defaultImages = [thumb0, thumb1, thumb2, thumb3, thumb4, thumb5];

interface Props {
  index: number;

  post: any;
  handleSignUpModal: () => void;
  changeId?: () => void;
}

const Container = styled.div`
  width: 50%;
  background-color: white;
  margin-left: calc(20% + 50px);
  margin-right: auto;
  padding-top: 20px;
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eef1f4;
  a {
    display: flex;
    margin-right: 5px;
  }
`;

const PageSource = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

const P = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 2.4em;
  color: #555;
  font-size: 14px;
  font-family: 'Roboto';
  font-weight: 400;
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
  :hover {
    background-color: #f6f8fa;
  }
  img {
    margin: 5px;
  }
`;

const Post = ({
  index,
  post: { document_id, title, description, image_url, favicon_url, url },
  handleSignUpModal,
}: Props) => {
  const [isOnBookmark, setOnBookmark] = useState(false);
  const [isOnShare, setOnShare] = useState(false);

  const imageNum = index % 6;
  if (!image_url) image_url = defaultImages[imageNum];
  if (!favicon_url) favicon_url = defaultFavicon;

  const { hostname } = new URL(url);
  const encodedTitle = encodeURIComponent(title.replaceAll(' ', '-'));

  // 1. 에러 이벤트의 타입 처리?
  // 2. img 태그 내에서 onError={(e) => {e.target.src = defaultImg}} 사용 시 에러 나는 이유?

  const handleImageError = (e: any) => {
    e.target.src = defaultImages[imageNum];
  };

  const handleFaviconError = (e: any) => {
    e.target.src = defaultFavicon;
  };

  return (
    <Container>
      <Main>
        <Text>
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to={`/liner.us/trusted-search/highlight/en/${document_id}/${encodedTitle}`}>
            <h2 style={{ marginBottom: '10px' }}>{title}</h2>
          </Link>
          <P>{description}</P>
        </Text>
        <Link
          to={`/liner.us/trusted-search/highlight/en/${document_id}/${encodedTitle}`}>
          <img
            style={{
              borderRadius: '5px',
              marginLeft: '10px',
              width: '96px',
              height: '96px',
              objectFit: 'cover',
            }}
            src={image_url}
            onError={handleImageError}
            alt='post thumbnail'
          />
        </Link>
      </Main>
      <Footer>
        <PageSource>
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
        </PageSource>
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
      </Footer>
    </Container>
  );
};

export default Post;
