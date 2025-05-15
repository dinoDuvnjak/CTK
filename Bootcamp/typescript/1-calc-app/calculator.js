function deriveFinalPrice(inputPrice) {
    var finalPrice = inputPrice + inputPrice * 0.19;
    console.log('Final Price: ' + finalPrice + ' €');
    // var outputEl = document.getElementById('final-price');
    // if (outputEl) { // moramo provjeriti da li je outputEl null
    //     outputEl.textContent = 'Final Price: ' + finalPrice + ' €';
    // }
}

var inputEl = document.querySelector('input');
if (inputEl) { // moramo provjeriti da li je inputEl null
    inputEl.addEventListener('input', function (event) {
        var inputValue = event.currentTarget.value;
        console.log('Input value: ' + inputValue);
        deriveFinalPrice(inputValue); // problem je ovdje jer inputValue nije broj, mozemo sa + prebaciti u broj
    });
}
