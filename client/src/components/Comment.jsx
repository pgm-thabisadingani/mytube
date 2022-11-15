import React from 'react';
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

const Comment = () => {
  return (
    <Container>
      <Image src="https://cdn.pixabay.com/photo/2022/09/16/13/07/woman-7458584_960_720.jpg" />
      <Details>
        <Name>
          Ossama Bin
          <Date> 4 months ago</Date>
        </Name>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ab culpa
          maxime architecto.
        </Text>
      </Details>
    </Container>
  );
};

export default Comment;
