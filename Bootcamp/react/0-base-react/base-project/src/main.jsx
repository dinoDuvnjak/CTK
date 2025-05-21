// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


//1. pokazi kako se koristi JSX
//2. demonstrraj u babelu, samo kopiraj sve osim importa - babel js website, try it our


// stari nacin
// var React = require('react');
// var ReactDOM = require('react-dom/client');

//ovo je es6 nacin - https://www.w3schools.com/js/js_es6.asp
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Footer from './footer';

const proba = "Dino je najbolji predavač ikad!";
const fistName = "Dino";
const lastName = "Babić";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

/// COMPONENTS /////
function Heading(props) {
  return <h1 style={props.style}>{props.text}</h1>;
  
}

const customStyle = {
  color: "red",
  fontSize: "30px", // primjeti kako se koristi camel case an ne standardni css font-size - https://www.w3schools.com/css/css_font_size.asp
  backgroundColor: "black",
  border: "1px solid red", //mora biti u stringy and ne u objectu kao u css
  padding: "10px",
  borderRadius: "5px"
};

customStyle.color = "blue"; // promjena boje u plavu

// const myElement = <h1>I Love JSX!</h1><p>neki</p>; // ovo ne radi jer JSX nije validan, samo jedan element može biti u JSX-u
const myElement = 
<div>
  {/* ovo ne moze, ima specijalne camel case znakove react className */}
  {/* sve moramo tako pisati u jsx -  https://www.w3schools.com/tags/ref_standardattributes.asp*/}
  <h1 className="naslov" contentEditable="true">I Love JSX!</h1>  
  <h2 style={{color: "blue"}}>Mijenjam boju</h2>
  <h2 style={customStyle}>Mijenjam boju</h2>
  <h2>Ime: {fistName} Prezime: {lastName}</h2>
  <Heading text="Dobar danko!" style={customStyle} />
   {/*ovo je templare literal u javascript jsx objektu, malo zbunjujuce ali validno  */}
  <h2>Ime: {`${fistName} ${lastName}`}</h2> 
  <p>Created by {fistName} {lastName}</p>
  <span>Copyright {currentYear}</span>
  <p>Pokazi brojanje broja {Math.floor(Math.random() * 10)}</p>
  <p>{proba}</p>
  <Footer year={currentYear} company="Dino Babić" text="Neki tekst ovdje" />
</div>;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(myElement);

/////// vjezba - STYLE - dinamicki naslov sa mijenjanjem boje ujutro poopodne navecer
// const currentHour = currentDate.getHours();
// let titleColor;
// let naslov = "Dobar dan!";
// if (currentHour < 12) {
//   titleColor = "red";
//   naslov = "Dobro jutro!";
// }
// else if (currentHour < 18) {
//   titleColor = "blue";
//   naslov = "Dobar dan!";
// } else {
//   titleColor = "green";
//   naslov = "Dobra večer!";
// }
// const titleStyle = {
//   color: titleColor,
//   fontSize: "30px",
//   backgroundColor: "black",
//   border: "1px solid red",
//   padding: "10px",
//   borderRadius: "5px"
// };
// const titleElement = <h1 style={titleStyle}>{naslov}</h1>;
// const titleRoot = ReactDOM.createRoot(document.getElementById('title'));
// titleRoot.render(titleElement);









