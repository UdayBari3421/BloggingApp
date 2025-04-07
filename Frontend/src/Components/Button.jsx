import React from "react";

const Button = ({ onClick, styles, type = "button", disabled = false, text, children }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles} cursor-pointer`}>
      {children || text}
    </button>
  );
};

export default Button;
