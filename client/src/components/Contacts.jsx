import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/Logo.png";
const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [loggedInUsername, setLoggedInUsername] = useState(undefined);
  const [loggedInProfileImage, setLoggedInProfileImage] = useState(undefined);
  const [selectedContact, setSelectedContact] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setLoggedInProfileImage(currentUser.profilePic);
      setLoggedInUsername(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setSelectedContact(index);
    changeChat(contact);
  };

  console.log(selectedContact);

  return (
    <>
      {loggedInProfileImage && loggedInUsername && (
        <div className="grid sm:grid-rows-chatContainer overflow-hidden bg-[#080420]">
          <div className="flex items-center sm:gap-4 justify-center ">
            <img
              className=" h-5 sm:h-10 px-2 animate-spin"
              src={logo}
              alt="logo"
            />
            <h3 className="text-white text-xs sm:text-base uppercase">
              C H A T
            </h3>
          </div>
          <div className="flex flex-col items-center overflow-auto gap-3">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={
                    index === selectedContact
                      ? "bg-indigo-400 min-h-contactH cursor-pointer w-11/12 rounded-xl p-2 flex flex-col justify-center sm:flex-row items-center sm  gap-4 sm:items-center sm:justify-start transition-all ease-in-out duration-500"
                      : "bg-gray-700 min-h-contactH cursor-pointer w-11/12 rounded-xl p-2 flex flex-col justify-center items-center sm:flex-row   gap-4 sm:items-center sm:justify-start transition-all ease-in-out duration-500"
                  }
                  key={contact._id}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="border-solid border-2 rounded-full border-[#01BAEF] w-12 h-12">
                    <img
                      src={`data:image/svg+xml;base64,${contact.profilePic}`}
                      alt=""
                    />
                  </div>
                  <div className="text-xs sm:text-base">
                    <h3 className="text-white">{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-[#0d0d30] flex flex-col sm:flex-row items-center justify-center sm:pl-6 gap-2 sm:gap-6">
            <div className="border-solid border-2 rounded-full border-[#01BAEF] w-12 h-12">
              <img
                src={`data:image/svg+xml;base64,${loggedInProfileImage}`}
                alt=""
              />
            </div>
            <div>
              <h2 className="text-white">{loggedInUsername}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;