import React, { useState } from "react";

function AddressForm() {
  const [address, setAddress] = useState({
    street: "",
    city: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    /// SPREAD OPERATOR
    // setAddress(prev => ({
    //   // preslikamo sve ključeve iz prev
    //   ...prev,
    //   // pa prepišemo samo onaj koji se mijenja
    //   [name]: value
    // }));

    //without spread operator
    setAddress(prev => {
      if (name === "street") {
        return {
          street: value,
          city: prev.city
        };
      } else if (name === "city") {
        return {
          street: prev.street,
          city: value
        };
      }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // alert(`Submitted: ${address.street}, ${address.city}`);
  }

  return (
    <div className="container">
      <h1>
        Your address: {address.street || "[ulica]"}, {address.city || "[grad]"}
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={address.street}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddressForm;
