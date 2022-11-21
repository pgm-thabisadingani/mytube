import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import app from '../firebase';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
`;
const Close = styled.div`
  position: absolute;
  top: 10;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);

  // show upload %
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);

  // ahndle everything related to our video e.g. Title, Desc, imageUrl & videoUrl
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const handleTags = (e) => {
    // split tags using commas
    setTags(e.target.value.split(','));
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadFile = (file, urlType) => {
    // call the storages
    const storage = getStorage(app);
    // create custom file name
    const fileName = new Date().getTime() + file.name;
    // create a storage reference
    const storageRef = ref(storage, fileName);
    //urlType: update the videoUrl and imageUrl API
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === 'imgUrl'
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // if its successful
          setInputs((prev) => {
            console.log(prev);
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  // upload video effect
  useEffect(() => {
    // if the is a video
    video && uploadFile(video, 'videoUrl');
  }, [video]);

  // upload imageo effect
  useEffect(() => {
    // if the is a image
    img && uploadFile(img, 'imgUrl');
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post('/videos', { ...inputs, tags });
    setOpen(false);
    res.status === 200 && navigate(`/video/${res.data._id}`);
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a new video</Title>
        <Label>Video:</Label>
        {/* if has video show % else input */}
        {videoPerc > 0 ? (
          'Uploading:' + videoPerc + '%'
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <Desc
          placeholder="Description"
          name="desc"
          rows={8}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Separate the tags with commas."
          onChange={handleTags}
        />
        <Label>Image:</Label>
        {/* if has image show % else input */}
        {imgPerc > 0 ? (
          'Uploading:' + imgPerc + '%'
        ) : (
          <Input
            type="file"
            // only images
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
