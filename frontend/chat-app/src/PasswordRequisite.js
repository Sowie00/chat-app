import React from "react";
import styled from "styled-components";

const PasswordRequisite = ({
  capsLetterFlag,
  numberFlag,
  pwdLengthFlag,
  specialCharFlag,
}) => {
  return (
    <>
      <p className={capsLetterFlag}>Must contain 1 Capital Letter</p>
      <p className={numberFlag}>Must contain a number</p>
      <p className={pwdLengthFlag}>Must be 8 characters or longer</p>
      <p className={specialCharFlag}>Must contain a special character</p>
    </>
  );
};

const Paragraph = styled.p`
  color: ${(props) => props.color};
`;

export default PasswordRequisite;
