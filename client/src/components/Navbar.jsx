import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import Upload from './Upload';
import MyTube from '../images/logo.png';
import { device } from '../utils/BreakPoints';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0px 20px;
  position: relative;

  @media ${device.tablet} {
    padding: 0px 20px;
  }

  @media ${device.laptop} {
    justify-content: flex-end;
  }
`;
const Search = styled.div`
  left: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;

  position: unset;

  @media ${device.mobileL} {
    width: 48%;
    position: absolute;
    margin: auto;
  }
  @media ${device.laptop} {
    width: 40%;
    position: unset;
  }
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  display: none;
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

  @media ${device.laptop} {
    display: flex;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  display: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;

  @media ${device.tablet} {
    display: flex;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;

  span {
    display: none !important;
    @media ${device.tablet} {
      display: block !important;
    }
  }

  @media ${device.laptop} {
    display: none;
  }
`;

const Img = styled.img`
  height: 25px;
  align-items: center;
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');

  const navigate = useNavigate();

  //useSelector : Reading data from the store (payload)
  //state.user : storage.user.currentUser (destructuring)
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignout = () => {
    // log out reducer fucntion
    dispatch(logout());
  };

  const handleSearch = () => {
    navigate(`/search?q=${q}`);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Logo>
              <Img src={MyTube} alt="logo" />
              <span className="logo">MyTube</span>
            </Logo>
          </Link>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon onClick={handleSearch} />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
              <Avatar src={currentUser.img} />
              {/* {currentUser.name} */}
              <Button onClick={handleSignout}>SIGN OUT</Button>
            </User>
          ) : (
            <Link to="/singin" style={{ textDecoration: 'none' }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
