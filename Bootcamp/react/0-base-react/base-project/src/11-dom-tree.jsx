import React from "react";

// const [isDone, setIsDone] = React.useState(false);

// // objasni kako mozemo sa previous value postici ovo
// function handleCLick() {
//   setIsDone((prevValue) => {
//     return !prevValue;
//   });
// }

function ToDoItem(props) {
  // props se ne mogu mijenjati, pokazi to
  return (
    <div
      // kada imamo funkcijo postavljenu sa zagradama, mi je zovemo odmah
      // umjeso da je prosljedjujemo kao referencu 
      // cim se renderujemo odmah ce je pozvati
      // zato se treba napraviti sa callback funkcijom
      //onClick={props.onChecked(props.id)} // objasni zasto je ovo greska i passing the function
      onClick={() => {
        props.onChecked(props.id);
      }}
    >
      <li>{props.text}</li>
    </div>
  );
}

export default ToDoItem;
