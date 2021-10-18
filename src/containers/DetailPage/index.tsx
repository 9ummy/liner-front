import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import Header from '../Header';
import SignUpModal from '../SignUpModal';
import SignInModal from '../../components/SignInModal';
import Post from '../../components/Post';
import SideBanner from '../../components/SideBanner';
import FocusDim from '../../components/FocusDim';
import ModalDim from '../../components/ModalDim';
import DetailPost from '../../components/DetailPost';
import RecommendPostBanner from '../../components/RecommendPostsBanner';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 100px;
`;

const PostsContainer = styled.div`
  @media only screen and (max-width: 719px) {
    min-width: 320px;
    width: 100%;
    margin: 0 25px;
  }

  width: 50%;
  margin-left: calc(20% + 50px);
  margin-right: 10px;

  .posts-title {
    @media only screen and (max-width: 719px) {
      min-width: 320px;
      width: 100%;
    }
    width: 50%;
    padding-bottom: 20px;
    border-bottom: 1px solid #eef1f4;
  }
  .posts-by-phrase-loading {
    @media only screen and (max-width: 719px) {
      min-width: 320px;
      width: 90%;
      margin: auto;
    }
    width: 50%;
    margin-right: auto;
    padding: 20px 0;
  }
`;

const BannerContainer = styled.div`
  @media only screen and (max-width: 719px) {
    display: none;
  }
  margin-right: 50px;
  width: 30%;
`;

const DetailPage = ({ match, history }: any) => {
  const [fetching, setFetching] = useState(false);
  const [isSignInModalOpen, setSignInModal] = useState(false);
  const [isSignUpModalOpen, setSignUpModal] = useState(false);
  const [isFocusDimActivated, setFocusDim] = useState(false);
  const [byPhraseAnchor, setByPhraseAnchor] = useState(null);
  const [byIdAnchor, setByIdAnchor] = useState(null);
  const [post, setPost] = useState<any>(null);
  const [postsByPhrase, setPostsByPhrase] = useState<any[]>([]);
  const [keywordsById, setKeywordsById] = useState<string[]>([]);
  const [postsById, setPostsById] = useState([]);

  useEffect(() => {
    getPost();
    getKeywordsById();
    getPostsById();
  }, []);

  const changePost = () => {
    setByPhraseAnchor(null);
    setPostsByPhrase([]);
    setPostsById([]);
  };

  useEffect(() => {
    getPost();
    getKeywordsById();
    getPostsById();
  }, [match.params.id]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const getPost = async () => {
    try {
      const res: any = await axios({
        method: 'get',
        url: `https://lks.getliner.com/document/${match.params.id}`,
        headers: { Authorization: 'Bearer null' },
      });
      setPost(res.data);
      getPostsByPhrase();
    } catch (e) {
      console.log(e);
    }
  };

  const getPostsByPhrase = async () => {
    try {
      setFetching(true);
      const res: any = await axios({
        method: 'post',
        url: 'https://lks.getliner.com/recommendation/document/byphrase',
        headers: { Authorization: 'Bearer null' },
        params: {
          size: 12,
          anchor: byPhraseAnchor,
        },
        data: {
          phrase: post.phrases[0].text || post.title,
          url: post.url,
          title: post.title,
          num_of_phrase: 7,
        },
      });
      const fetchedPosts = res.data.items;
      const mergedPosts = [...new Set([...postsByPhrase, ...fetchedPosts])];
      setPostsByPhrase(mergedPosts);
      setByPhraseAnchor(res.data.anchor);
      setFetching(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getKeywordsById = async () => {
    try {
      const res: any = await axios({
        method: 'get',
        url: 'https://lks.getliner.com/recommendation/keyword',
        headers: { Authorization: 'Bearer null' },
        params: {
          size: 12,
          document_id: match.params.id,
        },
      });
      setKeywordsById(res.data.items);
    } catch (e) {
      console.log(e);
    }
  };

  const getPostsById = async () => {
    try {
      const res: any = await axios({
        method: 'get',
        url: 'https://lks.getliner.com/recommendation/document',
        headers: { Authorization: 'Bearer null' },
        params: {
          size: 20,
          document_id: match.params.id,
          anchor: byIdAnchor,
        },
      });
      // showMore 버튼 눌렀을 때 data fetch가 더 일어나야 하는 건지 모르겠어서 일단 두었습니다
      // const fetchedPosts = res.data.items;
      // const mergedPosts = [...new Set([...postsByPhrase, ...fetchedPosts])];
      // setPostsByPhrase(mergedPosts);
      // setByIdAnchor(res.data.anchor);
      setPostsById(res.data.items);
    } catch (e) {
      console.log(e);
    }
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (
      scrollTop + clientHeight >= scrollHeight &&
      fetching === false &&
      post
    ) {
      getPostsByPhrase();
    }
  };

  if (isFocusDimActivated || isSignInModalOpen || isSignUpModalOpen) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }

  return (
    <>
      <Header
        keyword=''
        handleSignInModal={() => setSignInModal(true)}
        handleSignUpModal={() => setSignUpModal(true)}
        onFocus={() => setFocusDim(true)}
        onBlur={() => setFocusDim(false)}
        changeKeyword={() => {}}
        history={history}
      />
      <Container>
        <PostsContainer>
          {post && (
            <DetailPost
              post={post}
              handleSignUpModal={() => setSignUpModal(true)}
            />
          )}
          {postsByPhrase && <h2 className='posts-title'>More like this</h2>}
          {postsByPhrase.map((post: any, index: number) => {
            return (
              <Post
                key={index}
                index={0}
                post={post}
                handleSignUpModal={() => setSignUpModal(true)}
                changePost={changePost}
              />
            );
          })}
          {fetching && <h2 className='posts-by-phrase-loading'>Loading...</h2>}
        </PostsContainer>
        <BannerContainer>
          <SideBanner
            recommends={keywordsById}
            history={history}
            changeKeyword={() => {}}
          />

          <RecommendPostBanner
            history={history}
            recommends={postsById}
            changeKeyword={() => {}}
            changePost={changePost}
          />
        </BannerContainer>
      </Container>

      {isFocusDimActivated ? <FocusDim /> : null}
      {isSignInModalOpen || isSignUpModalOpen ? (
        <ModalDim
          onClick={() => {
            setSignInModal(false);
            setSignUpModal(false);
          }}
        />
      ) : null}

      {isSignUpModalOpen ? (
        <SignUpModal handleModalClose={() => setSignUpModal(false)} />
      ) : null}
      {isSignInModalOpen ? (
        <SignInModal handleModalClose={() => setSignInModal(false)} />
      ) : null}
    </>
  );
};

export default DetailPage;
