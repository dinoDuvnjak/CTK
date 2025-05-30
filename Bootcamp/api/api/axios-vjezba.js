const axios = require('axios');

async function dohvatiKorisnikaIPostove() {
  try {
    // 1. Dohvati korisnika
    const korisnikOdgovor = await axios.get('https://jsonplaceholder.typicode.com/users/1');
    const korisnik = korisnikOdgovor.data;

    console.log(`👤 Korisnik: ${korisnik.name}`);

    // 2. Dohvati postove tog korisnika
    const postoviOdgovor = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${korisnik.id}`);
    const postovi = postoviOdgovor.data;

    console.log(`📝 Postovi:`);
    postovi.forEach(post => {
      console.log(`- ${post.title}`);
    });

  } catch (error) {
    console.error('Greška:', error.message);
  }
}

dohvatiKorisnikaIPostove();
