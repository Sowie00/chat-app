import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAllUsersRoute } from "../utils/apiRoutes";
import Contacts from "../components/Contacts";
const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      if (currentUser) {
        if (currentUser.isProfilePicSet) {
          const data = await axios.get(
            `${getAllUsersRoute}/${currentUser._id}`
          );
          setContacts(data.data);
        } else {
          navigate("/setprofilepicture");
        }
      }
    };
    getUsers();
  }, [currentUser]);
  return (
    <Container>
      <SecondContainer>
        <Contacts contacts={contacts} currentUser={currentUser} />
      </SecondContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
`;

const SecondContainer = styled.div`
  height: 85vh;
  width: 85vw;
  background-color: #030202;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
`;

export default Chat;
