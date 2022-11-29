import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// useDispatch: dispatch actions from the store
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/userSlice';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* calc to center it minus the navbar height */
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 20px 50px;
  border: 1px solid ${({ theme }) => theme.border};
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;
const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.border};
  background-color: transparent;
  border-radius: 3px;
  padding: 10px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  color: ${({ theme }) => theme.textSoft};
  background-color: ${({ theme }) => theme.border};
  padding: 10px 20px;
  font-weight: 500;
  border-radius: 3px;
  border: none;
  cursor: pointer;
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const URL = 'https://mytube-api.onrender.com/api';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignnp = async (e) => {
    e.preventDefault();
    // out reducer fucntion
    dispatch(loginStart());
    try {
      const res = await axios.post(`${URL}/auth/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(res.data));
      navigate('/');
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    // out reducer fucntion
    dispatch(loginStart());
    try {
      const res = await axios.post(`${URL}/auth/signin`, { name, password });

      dispatch(loginSuccess(res.data));
      navigate('/');
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };

  const handleSigninWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        // add to mango db the google credetals
        axios
          .post(`${URL}/auth/google`, {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res);
            dispatch(loginSuccess(res.data));
            navigate('/');
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign In </Title>
        <SubTitle>to continue to MyTube</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={handleSigninWithGoogle}>Signin with Google</Button>
        <Title>or</Title>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignnp}>Sign up</Button>
      </Wrapper>
      <More>
        English(UK)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
