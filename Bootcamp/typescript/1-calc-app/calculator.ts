function deriveFinalPrice(inputPrice: number) { // ovdje smo dodali tip number
  const finalPrice = inputPrice + inputPrice * 0.19;
  const outputEl = document.getElementById('final-price');
  if (outputEl) { // moramo provjeriti da li je outputEl null
    outputEl.textContent = 'Final Price: ' + finalPrice + ' €';
  }
}

const formEl = document.querySelector('form');

if (formEl) { // moramo provjeriti da li je formEl null
  formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget as HTMLFormElement);
    const inputPrice = fd.get('price');
    if (inputPrice !== null) { // moramo provjeriti da li je inputPrice null
      deriveFinalPrice(+inputPrice); // mozemo koristiti + za konverziju u number
    }
  });
}
