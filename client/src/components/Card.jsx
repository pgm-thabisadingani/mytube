import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { device } from '../utils/BreakPoints';

const Container = styled.div`
  width: ${(props) => props.type !== 'sm' && '100%'};
  margin-bottom: ${(props) => (props.type === 'sm' ? '10px' : '45px')};
  cursor: pointer;

  display: ${(props) => props.type === 'sm' && 'flex'};
  gap: 10px;

  @media ${device.laptop} {
    width: ${(props) => props.type !== 'sm' && '360px'};
  }
`;

const Image = styled.img`
  width: 100%;
  flex: 1;
  height: ${(props) => (props.type === 'sm' ? '120px ' : '100%')};

  background-color: #999999;

  @media ${device.laptop} {
    height: ${(props) => (props.type === 'sm' ? '120px ' : '202px;')};
  }
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

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});

  const URL = 'https://mytube-api.onrender.com/api';

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`${URL}/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
      {/* pass the prop to the container */}
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel.img} />
          <Text>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>
              {video.views} views • {format(video.createdAt)}
            </Info>
          </Text>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
