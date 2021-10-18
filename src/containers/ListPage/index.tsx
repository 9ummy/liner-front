import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import Header from '../Header';
import SignUpModal from '../SignUpModal';
import SignInModal from '../../components/SignInModal';
import ListHeader from '../../components/ListHeader';
import Post from '../../components/Post';
import SideBanner from '../../components/SideBanner';
import FocusDim from '../../components/FocusDim';
import ModalDim from '../../components/ModalDim';

export type PostType = {
  docuemnt_id: string;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 100px;
`;

const StyledSideBanner = styled(SideBanner)`
  position: absolute;
  top: 100px;
  right: 50px;
  width: 17vw;
`;

const ListPage = ({ match, history }: any) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [isSignInModalOpen, setSignInModal] = useState(false);
  const [isSignUpModalOpen, setSignUpModal] = useState(false);
  const [isFocusDimActivated, setFocusDim] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [anchor, setAnchor] = useState(null);
  const [users, setUsers] = useState(0);
  const [keyword, setKeyword] = useState(match.params.keyword);
  const [recommends, setRecommends] = useState<string[]>([]);

  const decodedKeyword = decodeURIComponent(keyword.replaceAll('-', ' '));

  useEffect(() => {
    getPosts();
    getRecommends();
  }, [keyword]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const getRecommends = async () => {
    try {
      const res: any = await axios({
        method: 'get',
        url: 'https://lks.getliner.com/recommendation/keyword',
        headers: { Authorization: 'Bearer null' },
        params: {
          size: 12,
          keyword: decodedKeyword,
        },
      });
      setRecommends(res.data.items);
    } catch (e) {
      console.log(e);
    }
  };

  const getPosts = async () => {
    try {
      setLoading(true);
      const res: any = await axios({
        method: 'post',
        url: 'https://lks.getliner.com/search/document',
        headers: { Authorization: 'Bearer null' },
        params: {
          size: 20,
          anchor: null,
        },
        data: {
          query: decodedKeyword,
          num_of_phrase: 7,
        },
      });
      console.log(res.data);

      setUsers(res.data.approx_trust);
      setAnchor(res.data.anchor);
      setPosts(res.data.items);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getMorePosts = async () => {
    try {
      setFetching(true);
      const res: any = await axios({
        method: 'post',
        url: 'https://lks.getliner.com/search/document',
        headers: { Authorization: 'Bearer null' },
        params: {
          size: 20,
          anchor: anchor,
        },
        data: {
          query: decodedKeyword,
          num_of_phrase: 7,
        },
      });
      const fetchedPosts = res.data.items;
      const mergedPosts = posts.concat(...fetchedPosts);
      setPosts(mergedPosts);
      setAnchor(res.data.anchor);
      setFetching(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
      getMorePosts();
    }
  };

  const changeKeyword = (newKeyword: string) => {
    setAnchor(null);
    setPosts([]);
    setUsers(0);
    setKeyword(newKeyword);
  };

  if (isFocusDimActivated || isSignInModalOpen || isSignUpModalOpen) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }

  return (
    <>
      <Header
        keyword={decodedKeyword}
        handleSignInModal={() => setSignInModal(true)}
        handleSignUpModal={() => setSignUpModal(true)}
        onFocus={() => setFocusDim(true)}
        onBlur={() => setFocusDim(false)}
        changeKeyword={changeKeyword}
        history={history}
      />
      <Container>
        {loading ? (
          <h1
            style={{
              textAlign: 'center',
              width: '100%',
              position: 'absolute',
              top: '100px',
            }}>
            Loading...
          </h1>
        ) : (
          <ListHeader keyword={decodedKeyword} users={users} />
        )}
        {!loading &&
          posts.map((post, index) => {
            return (
              <Post
                key={index}
                post={post}
                index={index}
                handleSignUpModal={() => setSignUpModal(true)}
              />
            );
          })}
        {!loading && (
          <StyledSideBanner
            recommends={recommends}
            history={history}
            changeKeyword={changeKeyword}
          />
        )}
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

export default ListPage;