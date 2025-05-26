import React, {useState} from "react";

function Forms() {

    //pokazi controll components sa input i value
    // VJEZBa: kad ase klikne na submit button, da se ispisuje vrijednost input polja u naslovu

    const [inputValue, setInputValue] = useState("");
    const [submittedValue, setSubmittedValue] = useState("");

    function handleChange(event) {
        console.log("Input changed:", event.target.value);
        console.log("Event type:", event.type);
        setInputValue(event.target.value);
    }

    function handleClick() {    
        setSubmittedValue(inputValue);
    }



  return (
    <div className="container">
      <h1>{submittedValue}</h1>
      <input 
        onChange={handleChange}
        type="text" 
        placeholder="What's your name?" 
        // value je html atribut koji se koristi za kontrolu vrijednosti input polja
        // medjutim u reactu setujemo vrijednost input polja preko state-a
        // kako bi dobili single source of truth, to se zove controlled component
        // vise na linku https://reactjs.org/docs/forms.html#controlled-components
        value={inputValue}
      />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default Forms;
