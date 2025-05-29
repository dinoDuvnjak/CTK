import React, { useState } from "react";

function Complex() {
  const [fullName, setFullName] = useState({
    fName: "",
    lName: ""
  });

  function handleChange(event) {
    /// OVO TREBA U DECONSTRUCTURING
    //const value = event.target.value;
    //const name = event.target.name;
    const { value, name } = event.target;

    /// SPREAD OPERATOR
    setAddress(prev => ({
      // preslikamo sve ključeve iz prev
      ...prev,
      // pa prepišemo samo onaj koji se mijenja
      [name]: value
    }));

    // set full name ima pristup do prethodne vrijednosti
    // prevValue je prethodna vrijednost fullName
    setFullName(prevValue => {
      if (name === "fName") {
        return {
          fName: value,
          lName: prevValue.lName
        };
      } else if (name === "lName") {
        return {
          fName: prevValue.fName,
          lname: value
        };
      }
    });
  }

  return (
    <div className="container">
      <h1>
        Hello {fullName.fName} {fullName.lName}
      </h1>
      <form>
        <input
          name="fName"
          onChange={handleChange}
          placeholder="First Name"
          value={fullName.fName} //ovo zakomentiraj i vidi sta se desava neka googlaju controlled component vs uncontrolled component
        />
        <input
          name="lName"
          onChange={handleChange}
          placeholder="Last Name"
          value={fullName.lName}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Complex;
