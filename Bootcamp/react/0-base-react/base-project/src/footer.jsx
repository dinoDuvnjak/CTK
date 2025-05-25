import React from 'react';

function Footer(props) {
  // izracunaj neku kalkulaciju
  let currentYear = new Date().getFullYear();
  //promijeni neki css
  const footerStyle = {
    color: "blue",
    fontSize: "20px",
    backgroundColor: "lightgray",
    padding: "10px",
    borderRadius: "5px"
  };
  // props.year = 2023; // ovo ne radi jer props su readonly, ne mogu se mijenjati
  // props.company = "Dino Babić"; // ovo ne radi jer props su readonly, ne mogu se mijenjati
  // props.text = "Neki tekst ovdje"; // ovo ne radi jer props su readonly, ne mogu se mijenjati 

  //sme if conditions
  if (props.year < 2020) {
    console.log("Godina je manja od 2020");
    footerStyle.color = "red"; // promijeni boju u crvenu ako je godina manja od 2020
    currentYear = props.year; // promijeni currentYear na props.year ako je manja od 2020
  } else {
    console.log("Godina je veća ili jednaka 2020");
    footerStyle.color = "green"; // promijeni boju u zelenu ako je godina veća ili jednaka 2020
    currentYear = props.year; // promijeni currentYear na props.year ako je veća ili jednaka 2020
  }


  return (
    <footer>
      <p style={footerStyle}>Copyright &copy; {props.year} {props.company} {currentYear}</p>
      <p>{props.text}</p>
    </footer>
  );
}

// export functioanlity es6
// export default Footer; // ovo je es6 nacin
export default Footer;