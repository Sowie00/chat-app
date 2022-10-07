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
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please choose an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(
        `${setProfilePictureRoute}/${user._id}`,
        {
          image: avatars[selectedAvatar],
        }
      );
      if (data.isSet) {
        user.isProfilePicSet = true;
        user.profilePic = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error(
          "Error setting profile picture. Please try again!",
          toastOptions
        );
      }
    }
  };
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
    <>
      <Container>
        <TitleContainer>
          <Title>Choose your profile avatar</Title>
        </TitleContainer>
        <AvatarsContainer>
          {console.log(avatars)}
          {avatars.map((avatar, index) => {
            return (
              <Avatar selected={selectedAvatar === index ? true : false}>
                <Image
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  key={avatar}
                  onClick={() => setSelectedAvatar(index)}
                />
              </Avatar>
            );
          })}
        </AvatarsContainer>
        <Button onClick={setProfilePicture}>Set Profile Picture</Button>
      </Container>
      <ToastContainer />
    </>
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

const Image = styled.img`
  height: 6rem;
  transition: 0.5s ease-in-out;
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
  border: ${(props) => props.selected && "0.4rem solid indigo"};
  &:hover {
    border: 0.4rem solid indigo;
    cursor: pointer;
  }
`;

const Button = styled.button`
  background-color: teal;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  transition: 0.5s ease-in-out;
  &:hover {
    background-color: #591c85;
  }
`;

const TitleContainer = styled.div``;

const AvatarsContainer = styled.div`
  display: flex;
  gap: 2rem;
`;
export default SetProfilePicture;
