import React from "react";

function Complex() {
  const [fName, setFName] = React.useState("");
  const [lName, setLName] = React.useState("");

function handleChange(event) {
    const { name, value } = event.target;
    if (name === "fName") {
      setFName(value);
    } else if (name === "lName") {
      setLName(value);
    }
}

  return (
    <div className="container">
    <h1></h1>    

    <h1>Hello {fName} {lName}</h1>
      <form>
        <input name="fName" placeholder="First Name" onChange={handleChange}/>
        <input name="lName" placeholder="Last Name" onChange={handleChange}/>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Complex;
