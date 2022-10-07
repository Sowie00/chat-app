import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/Logo.png";
const Contacts = ({ contacts, currentUser }) => {
  const [loggedInUsername, setLoggedInUsername] = useState(undefined);
  const [loggedInProfileImage, setLoggedInProfileImage] = useState(undefined);
  const [selectedContact, setSelectedContact] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setLoggedInProfileImage(currentUser.profilePic);
      setLoggedInUsername(currentUser.username);
    }
  }, [currentUser]);

  console.log(contacts);

  return (
    <>
      {loggedInProfileImage && loggedInUsername && (
        <Container>
          <LogoContainer>
            <LogoImage src={logo} alt="logo" />
            <h3>C H A T</h3>
          </LogoContainer>
          <ContactsContainer>
            {contacts.map((contact, index) => {
              return (
                <Contact key={contact._id}>
                  <ProfilePictureContainer>
                    <ProfilePicture
                      src={`data:image/svg+xml;base64,${contact.profilePic}`}
                      alt=""
                    />
                  </ProfilePictureContainer>
                  <UsernameContainer>
                    <h3>{contact.username}</h3>
                  </UsernameContainer>
                </Contact>
              );
            })}
          </ContactsContainer>
          <CurrentUserContainer>
            <CurrentProfilePictureContainer>
              <CurrentProfilePicture
                src={`data:image/svg+xml;base64,${loggedInProfileImage}`}
                alt=""
              ></CurrentProfilePicture>
            </CurrentProfilePictureContainer>
            <CurrentUsernameContainer>
              <h2>{loggedInUsername}</h2>
            </CurrentUsernameContainer>
          </CurrentUserContainer>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  h3 {
    color: white;
    text-transform: uppercase;
  }
`;
const ContactsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  gap: 0.8rem;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
`;
const Contact = styled.div`
  background-color: #ffffff39;
  min-height: 5rem;
  cursor: pointer;
  width: 90%;
  border-radius: 0.2rem;
  padding: 0.4rem;
  gap: 1rem;
  align-items: center;
  display: flex;
  transition: 0.5s ease-in-out;
`;
const LogoImage = styled.img`
  height: 2rem;
`;
const ProfilePictureContainer = styled.div``;
const CurrentProfilePictureContainer = styled.div``;
const UsernameContainer = styled.div`
  h3 {
    color: white;
  }
`;

const CurrentUsernameContainer = styled.div`
  h2 {
    color: white;
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    h2 {
      font-size: 1rem;
    }
  }
`;
const CurrentUserContainer = styled.div`
  background-color: #0d0d30;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    gap: 0.5rem;
  }
`;
const ProfilePicture = styled.img`
  height: 3rem;
`;
const CurrentProfilePicture = styled.img`
  height: 4rem;
  max-inline-size: 100%;
`;

export default Contacts;
