function deriveFinalPrice(inputPrice) {
    var finalPrice = inputPrice + inputPrice * 0.19;
    var outputEl = document.getElementById('final-price');
    if (outputEl) { // moramo provjeriti da li je outputEl null
        outputEl.textContent = 'Final Price: ' + finalPrice + ' €';
    }
}
var formEl = document.querySelector('form');
if (formEl) { // moramo provjeriti da li je formEl null
    formEl.addEventListener('submit', function (event) {
        event.preventDefault();
        var fd = new FormData(event.currentTarget);
        var inputPrice = fd.get('price');
        if (inputPrice !== null) { // moramo provjeriti da li je inputPrice null
            deriveFinalPrice(+inputPrice); // mozemo koristiti + za konverziju u number
        }
    });
}
