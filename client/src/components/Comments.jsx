import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background-color: transparent;
  width: 100%;
  outline: none;
  padding: 5px;
`;

const Comments = () => {
  return (
    <Container>
      <NewComment>
        <Image src="https://cdn.pixabay.com/photo/2022/09/16/13/07/woman-7458584_960_720.jpg" />
        <Input type="text" placeholder="Add a comment..." />
      </NewComment>
      <Comment />
    </Container>
  );
};

export default Comments;
