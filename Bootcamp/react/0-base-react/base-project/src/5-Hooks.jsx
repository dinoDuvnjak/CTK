// import React from "react";
import React, { useState } from "react"; //koristi novi

function Hooks() {
    // ovo ne radi ako nije u komponenti, jer se state ne moze koristiti van komponente
    //DECONSTRUCTIONING ARRAY in JS
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring
    const rgb = [255, 0, 0]; // ovo je array sa tri elementa
    const [red, green, blue] = [255, 0, 0]; // ovo je deconstructioning, koristi se da bi se lakse koristili elementi u arrayu
    //console.log(red, green, blue); // ispisuje 255 0 0

    //const [count, setCount] = React.useState(0); // ovo je deconstructioning, koristi se da bi se lakse koristio state
    //let count = 0; //ovo je bilo prije
    const [count, setCount] = useState(0); // ovo je deconstructioning, koristi se da bi se lakse koristio state
    //prvi parametar je trenutna vrijednost statea, drugi je funkcija za promjenu vrijednosti statea
    // mozes to vidjeti u konzoli
    const state = React.useState(13123123); // kreiraj state, koristi useState hook
    //console.log(state); // state je array sa dva elementa, prvi je trenutna vrijednost, 
    // drugi je funkcija za promjenu vrijednosti


    
    function increase() {
       console.log(count); // ispisuje trenutnu vrijednost count u konzoli
       setCount(count + 1) // ispisuj count u konzoli
       console.log(count); // ispisuje trenutnu vrijednost count u konzoli, ali nece se promijeniti odmah jer je asinkrono
        //document.querySelector('h1').innerText = count; // promijeni tekst h1 elementa na novi count, KRIVO

        //KRIVO

        // myElement =
        // <>
        //   <h1>{count}</h1>
        //   <button onClick={increase}>Click Me!</button>
        // </>
        // const root = ReactDOM.createRoot(document.getElementById('root'));
        // root.render(myElement);
    }

    function decrase() {
        setCount(count - 1); // smanji count za 1
    }

    return (
    <div>
        {/* ovov je los kod zato moramo korisitit DECUONSTRUCTORS */}
        {/* <h1>{state[0]}</h1> */}
        <h1>{count}</h1>
        <button onClick={increase}>Incrase</button>
        <button onClick={decrase}>Decrase</button>
    </div>
    );
}


///VJEZBA NAPRAVITI DECRASE


// VJEZBA IZRADITI TAJMER
// function HooksVjezba() {
//   setInterval(updateTime, 1000);

//   const now = new Date().toLocaleTimeString();

//   const [time, setTime] = useState(now);

//   function updateTime() {
//     const newTime = new Date().toLocaleTimeString();
//     setTime(newTime);
//   }

//   return (
//     <div className="container">
//       <h1>{time}</h1>
//       <button onClick={updateTime}>Get Time</button>
//     </div>
//   );
// }

export default Hooks;