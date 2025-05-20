import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  //1. pokazi kako se korisri javascrip ekspresije
  const proba = "Dino je najbolji predavač ikad!";
  const fistName = "Dino";
  const lastName = "Babić";

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React {proba}</h1>
      <h2>Ime: {fistName} Prezime: {lastName}</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <p>
          {/* vjezba 2 */}
          Pokazi brojanje broja {Math.floor(Math.random() * 10)}
        </p>
      </div>
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <p>Created by {fistName} {lastName}</p>
      <span>Copyright {currentYear}</span>
    </>
  )
}

export default App
