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
      <Paragraph color={capsLetterFlag}>
        Must contain 1 Capital Letter
      </Paragraph>
      <Paragraph color={numberFlag}>Must contain a number</Paragraph>
      <Paragraph color={pwdLengthFlag}>
        Must be 8 characters or longer
      </Paragraph>
      <Paragraph color={specialCharFlag}>
        Must contain a special character
      </Paragraph>
    </>
  );
};

const Paragraph = styled.p`
  color: ${(props) => props.color};
`;

export default PasswordRequisite;
