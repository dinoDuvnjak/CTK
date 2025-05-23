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

////// igranje sa JSX-om

// const proba = "Dino je najbolji predavač ikad!";
// const fistName = "Dino";
// const lastName = "Babić";

// const myElement = 
// <div>
//   <h2>Ime: {fistName} Prezime: {lastName}</h2>
//   <h2>Ime: {`${fistName} ${lastName}`}</h2> 
//   <p>Pokazi brojanje broja {Math.floor(Math.random() * 10)}</p>
//   <p>Created by {fistName} {lastName}</p>
//   <span>Copyright {currentYear}</span>
//   <p>{proba}</p>
//   <Footer year={currentYear} company="Dino Babić" text="Neki tekst ovdje" />
// </div>;


// - objasni zasto nemoze kosristiti statement e u JSX-u ne radi
// const myElement = <h1>I Love JSX!{
//     if (condition) {
//       return "Hello";
//     }
//     else {
//       return "Goodbye";
//     }
//   }</h1>;

///////// VJEZBA - copyright year

// const myElement = 
// <div>
//   <p>Created by {fistName} {lastName}</p>
//   <span>Copyright {currentYear}</span>
// </div>;

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(myElement);


////////// STYLING
// - sve uvije u camel case
// - primjeti kako se koristi camel case an ne standardni css font-size - https://www.w3schools.com/css/css_font_size.asp
// - sve moramo tako pisati u jsx -  https://www.w3schools.com/tags/ref_standardattributes.asp
// - i html globale moraju biti u camel case contentEditable
//  <h1 className="naslov" contentEditable="true">I Love JSX!</h1> 
//  const img = <img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="W3Schools.com" width="100" height="100" />; 
// <img src={img} />

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


///// INLINE STYLING
// const customStyle = {
//   color: "red",
//   fontSize: "30px", // primjeti kako se koristi camel case an ne standardni css font-size - https://www.w3schools.com/css/css_font_size.asp
//   backgroundColor: "black",
//   border: "1px solid red", //mora biti u stringy and ne u objectu kao u css
//   padding: "10px",
//   borderRadius: "5px"
// };

// customStyle.color = "blue"; // promjena boje u plavu

// // const myElement = <h1>I Love JSX!</h1><p>neki</p>; // ovo ne radi jer JSX nije validan, samo jedan element može biti u JSX-u
// const myElement = 
// <div>
//   {/* syle ocekuje objkat zato su duple */}
//   <h2 style={{color: "blue"}}>Mijenjam boju</h2>
//   <h2 style={customStyle}>Mijenjam boju</h2>
// </div>;



/// COMPONENTS ///// - NEMOJ JOS POKAZIVATI KOMPONENTE
// function Heading(props) {
//   return <h1 style={props.style}>{props.text}</h1>;
  
// }
// const customStyle = {
//   color: "red",
//   fontSize: "30px", // primjeti kako se koristi camel case an ne standardni css font-size - https://www.w3schools.com/css/css_font_size.asp
//   backgroundColor: "black",
//   border: "1px solid red", //mora biti u stringy and ne u objectu kao u css
//   padding: "10px",
//   borderRadius: "5px"
// };
// const currentYear = new Date().getFullYear(); // trenutna godina

// // const myElement = <h1>I Love JSX!</h1><p>neki</p>; // ovo ne radi jer JSX nije validan, samo jedan element može biti u JSX-u
// const myElement = 
// <div>
//   <Heading text="Dobar danko!" style={customStyle} />
//    {/*ovo je templare literal u javascript jsx objektu, malo zbunjujuce ali validno  */}
  
//   <Footer year={currentYear} company="Dino Babić" text="Neki tekst ovdje" />
// </div>;


////// import export
// import pi from './import_predavanja';
// import pi,{doublePi, triplePi} from './import_predavanja';

// moze i ovo
//import * as pi from './import_predavanja'; // sve iz modula
//console.log(pi);


// const doublePires = doublePi();
// const triplePires = triplePi();
// const myElement = 
//   <div>
//     <h1>{pi}</h1>
//     <h1>{doublePi()}</h1>
//     <h1>{triplePires}</h1>
//   </div>

// VJEZBA DAJ IM HTML I NEKA NAPRAVE CARD KOMPOENENTU

import Card from './Card';

const myElement =
  <div>
    <h1>My Contacts</h1>

    <Card name="Dino Babić" img="https://www.w3schools.com/images/w3schools_green.jpg" tel_num="+387 61 234 567" />

    <Card name="Beyonce" img="https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg" tel_num="+123 456 789" />

    <h2>Beyonce</h2>
    <img
      src="https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg"
      alt="avatar_img"
    />
    <p>+123 456 789</p>
    <p>b@beyonce.com</p>

    // make card beyonce

    <h2>Jack Bauer</h2>
    <img
      src="https://pbs.twimg.com/profile_images/625247595825246208/X3XLea04_400x400.jpg"
      alt="avatar_img"
    />
    <p>+987 654 321</p>
    <p>jack@nowhere.com</p>

    <h2>Chuck Norris</h2>
    <img
      src="https://i.pinimg.com/originals/e3/94/47/e39447de921955826b1e498ccf9a39af.png"
      alt="avatar_img"
    />
    <p>+918 372 574</p>
    <p>gmail@chucknorris.com</p>
  </div>






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(myElement);











