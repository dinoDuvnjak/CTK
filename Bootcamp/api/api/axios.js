import axios from 'axios';

const api = axios.create({
  baseURL: 'https://neki-api.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});     


// Example of using axios to make a GET request with query parameters
try {
  const response = await axios.get('https://api.example.com/podaci');
  console.log(response.data);
} catch (error) {
  console.error(error.response.data);
}

// PRIMJER POST ZA SLANJE PODATAKA
try {
  const podaci = { ime: 'Ana', email: 'ana@example.com' };
  const response = await axios.post('https://api.example.com/korisnici', podaci, {
    headers: { Authorization: `Bearer ${tvojToken}` }
  });
  console.log(response.data);
} catch (error) {
  console.error(error.response.data);
}


// example of putting data to an API
try {
  const noviPodaci = { ime: 'Ana', email: 'nova@example.com' };
  const response = await axios.put('https://api.example.com/korisnici/1', noviPodaci);
  console.log(response.data);
} catch (error) {
  console.error(error.response.data);
}


// patch
try {
  const izmjena = { email: 'nova@example.com' };
  const response = await axios.patch('https://api.example.com/korisnici/1', izmjena);
  console.log(response.data);
} catch (error) {
  console.error(error.response.data);
}

// delete
try {
  const response = await axios.delete('https://api.example.com/korisnici/1');
  console.log(response.data);
} catch (error) {
  console.error(error.response.data);
}
