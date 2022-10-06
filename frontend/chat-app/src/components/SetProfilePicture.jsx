import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import axios from "axios";
import { setProfilePictureRoute } from "../utils/apiRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SetProfilePicture = () => {
  const api = `https://api.multiavatar.com/2345674`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const setProfilePicture = async () => {};
  useEffect(() => {
    const fetchPictures = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
    };
    fetchPictures().catch(console.error);
    setIsLoading(false);
  }, []);

  return (
    <Container>
      <TitleContainer>
        <Title>Choose your profile avatar</Title>
      </TitleContainer>
      <AvatarsContainer>
        {console.log(avatars)}
        {avatars.map((avatar, index) => {
          return (
            <Avatar>
              <img
                height="80rem"
                src={`data:image/svg+xml;base64,${avatar}`}
                alt="avatar"
                key={avatar}
              />
            </Avatar>
          );
        })}
      </AvatarsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131414;
  height: 100vh;
  width: 100vw;
`;

const Title = styled.h1`
  color: aqua;
`;

const Avatar = styled.div`
  border: 0.4rem solid transparent;
  padding: 0.4rem;
  border-radius: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s ease-in-out;
`;

const TitleContainer = styled.div``;

const AvatarsContainer = styled.div`
  display: flex;
  gap: 2rem;
`;
export default SetProfilePicture;
