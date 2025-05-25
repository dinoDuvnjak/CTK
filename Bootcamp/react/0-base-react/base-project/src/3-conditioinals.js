//https://en.wikipedia.org/wiki/Single-responsibility_principle
// https://legacy.reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator


const number = 5;
if (number > 2 && number < 10) { //ako je false, odmah ce na prvom uslovu stati i nece provjeravati dalje
    console.log("Number is between 2 and 10");
}

// u javascriptu korisitiom expression vs expression
// dok je u rectu moguce koristiti constition && expression
// npr terenary operator, ali i && operator
(number > 5) ? <h1>Tru uvijet</h1> : null; // ovo je ternary operator, ali nije validan u JSX-u jer mora biti jedan element
//react nacin 
(number > 5) && <h1>Tru uvijet</h1>; // ovo je validan u JSX-u, ako je number > 5, onda ce se prikazati h1 element, ako nije, onda nista


///// VJEZBA RJESENJE - CONDITIONAL RENDERING
//neka se forma zove login i obavezno im objasni separation of concerns, link gore
// i onda neka inputi u formi su zasebne komponente, a forma neka bude zasebna komponenta

// import contacts from './contacts';
// //  import Card from './Card';  
// import Form from './Form';

// const kontakti = contacts.map((contact) => {
//   // console.log(contact.name);
//   // console.log(contact.imgURL);
//   // console.log(contact.phone);
//   // console.log(contact.email);
//   return <Card
//     key={contact.id}
//     name={contact.name}
//     img={contact.imgURL}
//     tel_num={contact.phone}
//     email={contact.email}
//   />;
// }
// );  

// // if user is logged in, show contacts
// // if user is not logged in, show login form

// const isLoggedIn = false; // change this to false to show login form
// const myElement =
//   <div>
//     <h1>My Contacts</h1>
//     {isLoggedIn ? kontakti : <Form />}
//     {/* <Card name="Dino Babić" img="https://www.w3schools.com/images/w3schools_green.jpg" tel_num="+387 61 234 567" /> */}
//     {/* <Card name="Beyonce" img="https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg" tel_num="+123 456 789" /> */}
//   </div>;
// // const myElement = <h1>I Love JSX!</h1><p>neki</p>; // ovo ne radi jer JSX nije validan, samo jedan element može biti u JSX-u




// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(myElement);



// VJEZBA NAKON TOGA PROSIRENA
// zadrzi variablu is userLoggedIn
// prvjeri da li je userRegistered
// ako je userRegistered false, ako nije prikazi confirm password input i Register button