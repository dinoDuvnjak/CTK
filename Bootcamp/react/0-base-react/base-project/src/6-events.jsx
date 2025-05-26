import React, {useState} from "react";

// POKAZI KAKO SE KORISITI EVENT CLICK
// VJEZBA MOUSEOVER I MOUSEOUT

function Events() {
  const [headingText, setHeadingText] = useState("Hello World!");
  let [buttonClass, setButtonClass] = useState("button-color-white");

  function handleClick() {
    setHeadingText("Hello Dino Babić!");
  }

  function handleOnMouseOver() {
    console.log("Mouse is over the button");
    setButtonClass("button-color-black");
  }

  function handleOnMouseOut() {
    console.log("Mouse is out of the button");
    setButtonClass("button-color-white");

    buttonClass = "button-color-white";
  }


  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button 
        className={buttonClass} 
        onClick={handleClick} 
        onMouseOver={handleOnMouseOver} 
        onMouseOut={handleOnMouseOut}>
          Submit
      </button>
    </div>
  );
}

export default Events;
