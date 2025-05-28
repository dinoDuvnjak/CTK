var isDone = false; 
const strikethroughStyle = {
  textDecoration: isDone ? "line-through" : "none"
};
const myElement = 
  <div>
    <p style={strikethroughStyle}>parafsfsdfsdfsdf</p>
  </div>;


// IMPERATIVE PROGRAMIRANJE
function setParagraf() {
  document.getElementById("paragraf").style.textDecoration = "line-through";
}

const myElementImperative = 
  <div>
    <p id="paragraf">Ovo je paragraf</p>
    <button onClick={setParagraf}>Precrtaj text</button>
  </div>;

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(myElementImperative);