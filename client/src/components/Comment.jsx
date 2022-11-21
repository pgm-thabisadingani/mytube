import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin: 30px 0px;
  gap: 10px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Name = styled.span`
  font-weight: 500;
  font-size: 13px;
  color: ${({ theme }) => theme.text};
`;
const Date = styled.span`
  color: ${({ theme }) => theme.textSoft};
  font-weight: normal;
  font-size: 12px;
  margin-left: 5px;
`;
const Text = styled.p`
  color: ${({ theme }) => theme.text};
  font-weight: normal;
  font-size: 14px;
`;

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/users/find/${comment.userId}`);
      setChannel(res.data);
    };
    fetchComment();
  }, [comment.userId]);

  return (
    <Container>
      <Image src={channel.img} />
      <Details>
        <Name>
          {channel.name} <Date>1 day ago</Date>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
