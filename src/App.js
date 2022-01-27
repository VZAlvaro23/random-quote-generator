/* eslint-disable no-restricted-globals */

import React from "react";
import axios from "axios";

import "./App.css";
import { Button } from "./components";

import twitter from "./assets/twitter.png";
import whatsapp from "./assets/whatsapp.png";
import quotation from "./assets/quotation.png";

class App extends React.Component {
  state = { advice: "" };

  componentDidMount() {
    this.fetchAdvice();
    setInterval(this.crateSquare, 150);
  }

  //Getting advice from API
  fetchAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;
        this.setState({ advice });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Copies advice to clipboard
  copyToClipBoard() {
    var aux = document.createElement("input");

    aux.setAttribute("value", document.getElementById("heading").innerHTML);

    document.body.appendChild(aux);

    aux.select();

    document.execCommand("copy");

    document.body.removeChild(aux);

    alert("Text Copied!");
  }

  //Creates background squares
  crateSquare() {
    const squares = document.getElementById("squares");
    const square = document.createElement("span");

    var size = Math.random() * 50;

    square.style.width = 20 + size + "px";
    square.style.height = 20 + size + "px";

    square.style.top = Math.random() * innerHeight + "px";
    square.style.left = Math.random() * innerWidth + "px";

    squares.appendChild(square);

    setTimeout(() => {
      square.remove();
    }, 10000);
  }
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  render() {
    const { advice } = this.state;

    return (
      <div className="app" id="app">
        <div className="card">
          <div className="quotation">
            <Button imgUrl={quotation} onClick={this.copyToClipBoard} />
          </div>
          <h1 className="heading" id="heading">
            {advice}
          </h1>
          <button
            type="button"
            id="adv-btn"
            onClick={() => {
              this.fetchAdvice();
            }}
          >
            <span>More Advice!</span>
          </button>
          <div className="socials">
            <Button
              imgUrl={twitter}
              href={"https://twitter.com/intent/tweet?text=" + advice}
            />
            <Button
              imgUrl={whatsapp}
              href={"https://api.whatsapp.com/send?text=" + advice}
            />
          </div>
        </div>
        <div className="squares" id="squares"></div>
      </div>
    );
  }
}

export default App;
