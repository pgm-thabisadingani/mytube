import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MyTube from '../images/logo.png';

import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { device } from '../utils/BreakPoints';
import { logout } from '../redux/userSlice';

const Open = styled.div`
  display: ${(props) => (props.openMenu === true ? 'none' : 'block')};
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
  cursor: pointer;
  @media ${device.laptop} {
    display: none;
  }
`;

const OpenWrapper = styled.div`
  padding: 15px 10px;
  background-color: ${({ theme }) => theme.bgLighter};
`;
const Container = styled.div`
  display: ${(props) => (props.openMenu === true ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};

  /*height calculate the navbar height :50px and its padding of 20px (padding: 10px 10px)*/
  height: ${(props) => (props.openMenu === true ? '100%' : '50px')};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  overflow: scroll;
  /* hide the scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }

  background-color: #000000a7;
  z-index: 10000;
  width: 100%;

  @media ${device.laptop} {
    position: sticky;
    height: 100vh;
    flex: 2 !important;
    display: block;
  }

  @media ${device.laptopL} {
    flex: 1 !important;
  }
`;

const Wrapper = styled.div`
  padding: 18px 26px;
  background-color: ${({ theme }) => theme.bgLighter};
  width: 60%;
  height: 100vh;

  @media ${device.mobileL} {
    width: 40%;
    /* height: 100%; */
  }

  @media ${device.laptop} {
    width: calc(100% - 52px);
    /* height: 100%; */
  }
`;

const Logo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
  align-items: center;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
  &:hover {
    background-color: ${({ theme }) => theme.border};
  }
`;

const Hr = styled.div`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.border}; ;
`;

const Login = styled.div``;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
  text-transform: uppercase;
`;

const Close = styled.div`
  position: absolute;
  right: 0;

  font-size: 20px;
  @media ${device.laptop} {
    display: none;
  }
`;

const Menu = ({ setDarkMode, darkMode }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  //useSelector : Reading data from the store (payload)
  //state.user : storage.user.currentUser (destructuring)
  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = () => {
    // log out reducer fucntion
    dispatch(logout());
  };

  return (
    <>
      <Open openMenu={openMenu} onClick={() => setOpenMenu(!openMenu)}>
        <OpenWrapper>
          <MenuOutlinedIcon />
        </OpenWrapper>
      </Open>
      <Container openMenu={openMenu}>
        <Wrapper>
          <Link
            to="/"
            style={{ textDecoration: 'none', color: 'inherit' }}
            onClick={() => setOpenMenu(false)}
          >
            <Logo>
              <Img src={MyTube} alt="logo" />
              MyTube
              <Close onClick={() => setOpenMenu(!openMenu)}>
                <MenuOutlinedIcon />
              </Close>
            </Logo>
          </Link>
          <Link
            to="/"
            style={{ textDecoration: 'none', color: 'inherit' }}
            onClick={() => setOpenMenu(false)}
          >
            <Item>
              <HomeIcon /> Home
            </Item>
          </Link>
          <Link
            to="/trends"
            style={{ textDecoration: 'none', color: 'inherit' }}
            onClick={() => setOpenMenu(false)}
          >
            <Item>
              <ExploreOutlinedIcon />
              Explore
            </Item>
          </Link>
          <Link
            to="/sub"
            style={{ textDecoration: 'none', color: 'inherit' }}
            onClick={() => setOpenMenu(false)}
          >
            <Item onClick={() => setOpenMenu(false)}>
              <SubscriptionsOutlinedIcon />
              Subscriptions
            </Item>
          </Link>
          <Hr />
          <Item onClick={() => setOpenMenu(false)}>
            <VideoLibraryOutlinedIcon />
            Library
          </Item>
          <Item onClick={() => setOpenMenu(false)}>
            <HistoryOutlinedIcon />
            History
          </Item>
          <Hr />
          {currentUser ? (
            /* setting up multiple listeners */
            <Login onClick={() => handleSignout() & setOpenMenu(false)}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN OUT
              </Button>
            </Login>
          ) : (
            <Login>
              Sign in to like videos, comment and subscribe.
              <Link
                to="/singin"
                style={{ textDecoration: 'none' }}
                onClick={() => setOpenMenu(false)}
              >
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
          )}
          <Hr />

          <Title>Best of MyTube</Title>
          <Item onClick={() => setOpenMenu(false)}>
            <LibraryMusicOutlinedIcon />
            Music
          </Item>
          <Item onClick={() => setOpenMenu(false)}>
            <SportsBasketballOutlinedIcon />
            Sports
          </Item>
          <Item onClick={() => setOpenMenu(false)}>
            <SportsEsportsOutlinedIcon />
            Gaming
          </Item>
          <Item onClick={() => setOpenMenu(false)}>
            <MovieOutlinedIcon />
            Movies
          </Item>
          <Item onClick={() => setOpenMenu(false)}>
            <ArticleOutlinedIcon />
            News
          </Item>
          <Item onClick={() => setOpenMenu(false)}>
            <LiveTvOutlinedIcon />
            Live
          </Item>
          <Hr />
          <Item onClick={() => setOpenMenu(false)}>
            <SettingsOutlinedIcon />
            Settings
          </Item>
          <Item onClick={() => setOpenMenu(false)}>
            <FlagOutlinedIcon />
            Report
          </Item>
          <Item onClick={() => setOpenMenu(false)}>
            <HelpOutlineOutlinedIcon />
            Help
          </Item>
          {/* setting up multiple listeners */}
          <Item onClick={() => setDarkMode(!darkMode) & setOpenMenu(false)}>
            <SettingsBrightnessOutlinedIcon />
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </Item>
        </Wrapper>
      </Container>
    </>
  );
};

export default Menu;
