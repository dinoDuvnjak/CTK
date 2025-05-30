
// 🎯 Definiramo novi Promise
const fetchData = new Promise((resolve, reject) => {
    let dataReceived = true;

    // Simulacija kašnjenja od 2 sekunde
    setTimeout(() => {
        if (dataReceived) {
            resolve("Data fetched successfully!");
        } else {
            reject("Failed to fetch data.");
        }
    }, 2000);
});

// ✅ Koristimo .then() i .catch() da uhvatimo rezultat
fetchData
    .then((message) => {
        console.log(message); // Ispis: "Data fetched successfully!"
    })
    .catch((error) => {
        console.error(error); // U slučaju greške
    });



// sminkerski nacin
// 🎯 Definiranje async funkcije
async function getData() {
    console.log("Fetching data...");

    // ➡️ Čekamo da Promise završi (kao da smo rekli: "stani ovdje i čekaj")
    try {
        const response = await fetchData;
        console.log(response); // Ispis: "Data fetched successfully!"
    } catch (error) {
        console.error(error); // U slučaju greške
    }
}

getData(); // Poziv funkcije




/// ASYNC DETALJNIJE

// Objašnjenje:
// async ispred funkcije označava da je funkcija asinhrona i da može koristiti await.

// await se koristi unutar async funkcije kako bi "sačekao" da se neki Promise završi prije nego što nastavi dalje.

// Kod nakon await čeka da se Promise završi (npr. 2 sekunde u ovom primjeru) i tek tada se nastavlja.



async function fetchData() {
    // 1️⃣ Početak async funkcije
    console.log("Fetching data...");

    // 2️⃣ Čekamo da se Promise izvrši
    const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data fetched successfully!");
        }, 2000);
    });

    // 3️⃣ Ispis rezultata
    console.log(response);
}

fetchData();

//  Što se ovdje događa?
// fetch šalje HTTP zahtjev i vraća Promise.

// await čeka da se zahtjev izvrši (da stignu podaci) prije nego što nastavi dalje.

// Kad podaci stignu, await čeka da se oni parsiraju u JSON format.

// Ako sve prođe u redu, podaci se ispisuju, inače catch hvata grešku.

async function getUserData() {
    console.log("Fetching user data...");

    try {
        // ✅ Čekamo da podaci stignu
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        
        // ✅ Čekamo da se parsira JSON
        const userData = await response.json();

        // ✅ Ispisujemo podatke
        console.log(userData);

    } catch (error) {
        console.error("Failed to fetch user data:", error);
    }
}

getUserData();
