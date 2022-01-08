import React from "react";
import PropTypes from "prop-types";


import { ButtonStyled } from './Contact.styled';

export default function ContactItem({ id, name, number, deleteContact }) {
  return (
    <>
      <span>
        {name} : {number}
      </span>
      <ButtonStyled type="button" onClick={() => deleteContact(id)}>
        Delete
      </ButtonStyled>
    </>
  ); 
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
}