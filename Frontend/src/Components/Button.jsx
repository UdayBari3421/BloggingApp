import React from "react";

const Button = ({ onClickHandler, styles, type = "button", disabled = false, text, children }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClickHandler}
      className={`${styles} cursor-pointer`}>
      {children || text}
    </button>
  );
};

export default Button;
