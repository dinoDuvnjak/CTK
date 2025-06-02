// server.js
// Expandirana verzija za vježbu CRUD operacija nad tablicom 'studenti'.
//
// Prije pokretanja:
// 1. Provjerite imate li instalirane pakete: 
//    npm install express body-parser pg
// 2. Provjerite da vaša baza 'school' sadrži tablicu 'studenti' ovakve strukture:
//
//   CREATE TABLE studenti (
//     id SERIAL PRIMARY KEY,
//     ime VARCHAR(50) NOT NULL,
//     prezime VARCHAR(50) NOT NULL,
//     godina_rođenja INT CHECK (godina_rođenja BETWEEN 1900 AND EXTRACT(YEAR FROM CURRENT_DATE)),
//     email TEXT
//   );
//
// 3. Pokrenite: node server.js
//

import express from "express";
import bodyParser from "body-parser";
import { Client } from "pg";

const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "school",
  password: "dduvnja6",
  port: 5432,
});

const app = express();
const port = 3000;

// Middleware za parsiranje JSON tijela zahtjeva
app.use(bodyParser.json());

// Poveži se na bazu
db.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => {
    console.error("Ne mogu se spojiti na bazu:", err.stack);
    process.exit(1);
  });

/**
 * GET /studenti
 * Dohvati sve studente
 */
app.get("/studenti", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM studenti ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing SELECT * FROM studenti:", err.stack);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /studenti/:id
 * Dohvati jednog studenta po id-u
 */
app.get("/studenti/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM studenti WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student nije pronađen" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error executing SELECT * FROM studenti WHERE id = ${id}:`, err.stack);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /studenti
 * Dodaj novog studenta
 * Očekuje JSON tijelo:
 * {
 *   "ime": "string",
 *   "prezime": "string",
 *   "godina_rođenja": broj,
 *   "email": "string"   // (opcionalno)
 * }
 */
app.post("/studenti", async (req, res) => {
  const { ime, prezime, godina_rođenja, email } = req.body;
  // Provjera obaveznih polja
  if (!ime || !prezime) {
    return res.status(400).json({ error: "Polja 'ime' i 'prezime' su obavezna." });
  }

  try {
    const result = await db.query(
      `INSERT INTO studenti (ime, prezime, godina_rođenja, email)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [ime, prezime, godina_rođenja || null, email || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error executing INSERT INTO studenti:", err.stack);
    res.status(400).json({ error: err.message });
  }
});

/**
 * PUT /studenti/:id
 * Ažuriraj postojećeg studenta
 * Očekuje JSON tijelo koje može sadržavati neka od polja:
 * {
 *   "ime": "string",
 *   "prezime": "string",
 *   "godina_rođenja": broj,
 *   "email": "string"
 * }
 */
app.put("/studenti/:id", async (req, res) => {
  const { id } = req.params;
  const { ime, prezime, godina_rođenja, email } = req.body;

  // Sastavimo dinamičku UPDATE naredbu prema poljima koja su poslana
  const fields = [];
  const values = [];
  let idx = 1;

  if (ime !== undefined) {
    fields.push(`ime = $${idx++}`);
    values.push(ime);
  }
  if (prezime !== undefined) {
    fields.push(`prezime = $${idx++}`);
    values.push(prezime);
  }
  if (godina_rođenja !== undefined) {
    fields.push(`godina_rođenja = $${idx++}`);
    values.push(godina_rođenja);
  }
  if (email !== undefined) {
    fields.push(`email = $${idx++}`);
    values.push(email);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: "Nema polja za ažuriranje." });
  }

  // Dodajemo id na kraj values
  values.push(id);

  const query = `
    UPDATE studenti
    SET ${fields.join(", ")}
    WHERE id = $${idx}
    RETURNING *
  `;

  try {
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student nije pronađen za ažuriranje." });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error executing UPDATE studenti id=${id}:`, err.stack);
    res.status(400).json({ error: err.message });
  }
});

/**
 * DELETE /studenti/:id
 * Obriši studenta po id-u
 */
app.delete("/studenti/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM studenti WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student nije pronađen za brisanje." });
    }
    res.json({ message: "Student obrisan.", student: result.rows[0] });
  } catch (err) {
    console.error(`Error executing DELETE FROM studenti WHERE id=${id}:`, err.stack);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Dodatni endpoint za testiranje: izvrši proizvoljan SQL nad 'studenti'
 * Ovaj endpoint prikladan je samo za lokalnu vježbu (nije preporučeno na produkciji).
 *
 * POST /studenti/query
 * Body: { "sql": "BILO KOJI SQL NAD TABLICOM studenti" }
 * Primjer: { "sql": "SELECT * FROM studenti WHERE ime = 'Ana'" }
 */
app.post("/studenti/query", async (req, res) => {
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

// Početna ruta s kratkim uputama
app.get("/", (req, res) => {
  res.send(`
    <h1>Vježba: Tablica 'studenti'</h1>
    <p>CRUD operacije dostupne putem sljedećih endpointa:</p>
    <ul>
      <li>GET  /studenti           – Dohvati sve studente</li>
      <li>GET  /studenti/:id       – Dohvati jednog studenta po id-u</li>
      <li>POST /studenti           – Dodaj novog studenta</li>
      <li>PUT  /studenti/:id       – Ažuriraj postojećeg studenta</li>
      <li>DELETE /studenti/:id     – Obriši studenta po id-u</li>
      <li>POST /studenti/query     – Izvrši proizvoljan SQL nad tablicom 'studenti' (za vježbu)</li>
    </ul>
    <p>Korištenje: Pošaljite JSON zahtjev na odgovarajući endpoint (npr. putem Postmana ili cURL).</p>
  `);
});

// Pokreni server
app.listen(port, () => {
  console.log(`Server pokrenut na http://localhost:${port}`);
});
