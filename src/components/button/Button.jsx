import React from "react";
import "./button.css";

const Button = ({ imgUrl, href, onClick }) => {
  return (
    <ul>
      <li onClick={onClick}>
        <a href={href}>
          <img src={imgUrl} alt="button"></img>
        </a>
      </li>
    </ul>
  );
};

export default Button;
