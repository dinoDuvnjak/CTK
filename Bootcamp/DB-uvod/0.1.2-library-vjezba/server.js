// server.js
// Primjer proširenog Node.js servera za vježbu CRUD operacija nad tablicom 'knjige'.
//
// Prije pokretanja:
// 1. Provjerite imate li instalirane pakete:
//    npm install express body-parser pg
// 2. Provjerite da vaša baza 'library' sadrži tablicu 'knjige' ovakve strukture:
//
//   CREATE TABLE knjige (
//     id SERIAL PRIMARY KEY,
//     naslov VARCHAR(100) NOT NULL,
//     autor VARCHAR(100) NOT NULL,
//     godina_izdanja INT CHECK (godina_izdanja BETWEEN 1500 AND EXTRACT(YEAR FROM CURRENT_DATE)),
//     zanr TEXT
//   );
//
// 3. Pokrenite: node server.js
//

import express from "express";
import bodyParser from "body-parser";
import { Client } from "pg";

const db = new Client({
  user: "postgres",       // zamijenite prema vlastitoj konfiguraciji
  host: "localhost",
  database: "library",    // ime baze u kojoj je tablica 'knjige'
  password: "yourPasswordHere", // zamijenite stvarnom lozinkom
  port: 5432,
});

const app = express();
const port = 3000;

// Middleware za parsiranje JSON tijela zahtjeva
app.use(bodyParser.json());

// Poveži se na bazu
db.connect()
  .then(() => console.log("Connected to PostgreSQL (library)"))
  .catch((err) => {
    console.error("Ne mogu se spojiti na bazu:", err.stack);
    process.exit(1);
  });

/**
 * GET /knjige
 * Dohvati sve knjige (redoslijed prema ID uzi).
 */
app.get("/knjige", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM knjige ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing SELECT * FROM knjige:", err.stack);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /knjige/:id
 * Dohvati jednu knjigu po ID-u.
 */
app.get("/knjige/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM knjige WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Knjiga nije pronađena" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error executing SELECT * FROM knjige WHERE id = ${id}:`, err.stack);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /knjige
 * Dodaj novu knjigu
 * Očekuje JSON tijelo:
 * {
 *   "naslov": "string",           // obavezno
 *   "autor": "string",            // obavezno
 *   "godina_izdanja": broj,       // (opcionalno)
 *   "zanr": "string"              // (opcionalno)
 * }
 */
app.post("/knjige", async (req, res) => {
  const { naslov, autor, godina_izdanja, zanr } = req.body;

  // Provjera obaveznih polja
  if (!naslov || !autor) {
    return res.status(400).json({ error: "Polja 'naslov' i 'autor' su obavezna." });
  }

  try {
    const result = await db.query(
      `INSERT INTO knjige (naslov, autor, godina_izdanja, zanr)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [naslov, autor, godina_izdanja || null, zanr || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error executing INSERT INTO knjige:", err.stack);
    res.status(400).json({ error: err.message });
  }
});

/**
 * PUT /knjige/:id
 * Ažuriraj postojeću knjigu
 * Očekuje JSON tijelo koje može sadržavati bilo koja od polja:
 * {
 *   "naslov": "string",
 *   "autor": "string",
 *   "godina_izdanja": broj,
 *   "zanr": "string"
 * }
 */
app.put("/knjige/:id", async (req, res) => {
  const { id } = req.params;
  const { naslov, autor, godina_izdanja, zanr } = req.body;

  // Dinamički sastavljamo UPDATE naredbu na temelju poslanih polja
  const fields = [];
  const values = [];
  let idx = 1;

  if (naslov !== undefined) {
    fields.push(`naslov = $${idx++}`);
    values.push(naslov);
  }
  if (autor !== undefined) {
    fields.push(`autor = $${idx++}`);
    values.push(autor);
  }
  if (godina_izdanja !== undefined) {
    fields.push(`godina_izdanja = $${idx++}`);
    values.push(godina_izdanja);
  }
  if (zanr !== undefined) {
    fields.push(`zanr = $${idx++}`);
    values.push(zanr);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: "Nema polja za ažuriranje." });
  }

  // Dodamo id na kraj niza values
  values.push(id);

  const query = `
    UPDATE knjige
    SET ${fields.join(", ")}
    WHERE id = $${idx}
    RETURNING *
  `;

  try {
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Knjiga nije pronađena za ažuriranje." });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error executing UPDATE knjige id=${id}:`, err.stack);
    res.status(400).json({ error: err.message });
  }
});

/**
 * DELETE /knjige/:id
 * Obriši knjigu po ID-u
 */
app.delete("/knjige/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM knjige WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Knjiga nije pronađena za brisanje." });
    }
    res.json({ message: "Knjiga obrisana.", knjiga: result.rows[0] });
  } catch (err) {
    console.error(`Error executing DELETE FROM knjige WHERE id=${id}:`, err.stack);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /knjige/query
 * Izvrši proizvoljan SQL nad tablicom 'knjige'
 * Ovaj endpoint pogodan je isključivo za lokalnu vježbu (nije preporučeno u produkciji).
 *
 * Body: { "sql": "BILO KOJI SQL NAD TABLICOM knjige" }
 * Primjer: { "sql": "SELECT * FROM knjige WHERE autor = 'Ivo Andrić'" }
 */
app.post("/knjige/query", async (req, res) => {
  const { sql } = req.body;
  if (!sql || typeof sql !== "string") {
    return res.status(400).json({ error: "Potrebno je polje 'sql' tipa string." });
  }
  try {
    const result = await db.query(sql);
    res.json({
      rowCount: result.rowCount,
      rows: result.rows,
      command: result.command,
    });
  } catch (err) {
    console.error(`Error executing custom SQL: ${sql}`, err.stack);
    res.status(400).json({ error: err.message });
  }
});

/**
 * GET /
 * Početna ruta s kratkim uputama
 */
app.get("/", (req, res) => {
  res.send(`
    <h1>Vježba: Tablica 'knjige'</h1>
    <p>CRUD operacije dostupne putem sljedećih endpointa:</p>
    <ul>
      <li>GET    /knjige           – Dohvati sve knjige</li>
      <li>GET    /knjige/:id       – Dohvati jednu knjigu po ID-u</li>
      <li>POST   /knjige           – Dodaj novu knjigu</li>
      <li>PUT    /knjige/:id       – Ažuriraj postojeću knjigu</li>
      <li>DELETE /knjige/:id       – Obriši knjigu po ID-u</li>
      <li>POST   /knjige/query     – Izvrši proizvoljan SQL nad tablicom 'knjige'</li>
    </ul>
    <p>Korištenje: Pošaljite JSON zahtjev (npr. u Postmanu ili preko cURL) na odgovarajući endpoint.</p>
  `);
});

// Pokreni server
app.listen(port, () => {
  console.log(`Server pokrenut na http://localhost:${port}`);
});
