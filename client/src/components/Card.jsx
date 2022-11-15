import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: ${(props) => props.type !== 'sm' && '360px'};
  margin-bottom: ${(props) => (props.type === 'sm' ? '10px' : '45px')};
  cursor: pointer;

  display: ${(props) => props.type === 'sm' && 'flex'};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  flex: 1;
  height: ${(props) => (props.type === 'sm' ? '120px ' : '202px;')};
  background-color: #999999;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== 'sm' && '16px'};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
  background-color: #999999;
  display: ${(props) => props.type === 'sm' && 'none'};
`;

const Text = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
`;

const ChannelName = styled.h2`
  font-size: 14px;
  margin: 9px 0px;
  color: ${({ theme }) => theme.textSoft};
`;

const Info = styled.p`
  margin: 9px 0px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type }) => {
  return (
    <Link to="video/test" style={{ textDecoration: 'none' }}>
      {/* pass the prop to the container */}
      <Container type={type}>
        <Image
          type={type}
          src="https://cdn.pixabay.com/photo/2015/12/22/08/06/face-1103708_960_720.jpg"
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src="https://cdn.pixabay.com/photo/2022/09/16/13/07/woman-7458584_960_720.jpg"
          />
          <Text>
            <Title>Test Video</Title>
            <ChannelName>Dave Dev</ChannelName>
            <Info>660,908 views • 1 day ago</Info>
          </Text>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
