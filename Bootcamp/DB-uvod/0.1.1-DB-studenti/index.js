// server.js
// Proširena verzija za vježbu CRUD operacija nad tablicama 'studenti' i 'kontakti' (one-to-one relacija).
//
// Prije pokretanja:
// 1. Provjerite imate li instalirane pakete: 
//    npm install express body-parser pg
// 2. Provjerite da vaša baza 'school' sadrži tablice 'studenti' i 'kontakti' točno prema sljedećoj shemi:
//
//   CREATE TABLE studenti (
//     id SERIAL PRIMARY KEY,
//     ime VARCHAR(50) NOT NULL,
//     prezime VARCHAR(50) NOT NULL,
//     godina_rođenja INT CHECK (godina_rođenja BETWEEN 1900 AND EXTRACT(YEAR FROM CURRENT_DATE)),
//     email TEXT
//   );
//
//   CREATE TABLE kontakti (
//     id SERIAL PRIMARY KEY,
//     student_id INT UNIQUE REFERENCES studenti(id) ON DELETE CASCADE,
//     tel TEXT,
//     adresa TEXT
//   );
//
// 3. (Opcionalno) Ubacite par testnih studenata i kontakata kao u gornjem primjeru.
// 4. Pokrenite: node server.js
//

import express from "express";
import bodyParser from "body-parser";
import { Client } from "pg";

const db = new Client({
  user: "postgres",       // zamijenite prema vlastitoj konfiguraciji
  host: "localhost",
  database: "school",     // baza u kojoj su tablice 'studenti' i 'kontakti'
  password: "yourPasswordHere", // zamijenite stvarnom lozinkom
  port: 5432,
});

const app = express();
const port = 3000;

// Middleware za parsiranje JSON tijela zahtjeva
app.use(bodyParser.json());

// Poveži se na bazu
db.connect()
  .then(() => console.log("Connected to PostgreSQL (school)"))
  .catch((err) => {
    console.error("Ne mogu se spojiti na bazu:", err.stack);
    process.exit(1);
  });

/* ===========================
   CRUD ZA TABLICU 'studenti'
   =========================== */

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
  // Nemojte koristiti db.end() ovdje jer bi to zatvorilo vezu s bazom
  // i onemogućilo obradu svih budućih zahtjeva
});

/**
 * GET /studenti/:id
 * Dohvati jednog studenta po id-u (bez kontakta)
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
 *   "godina_rođenja": broj,   // (opcionalno)
 *   "email": "string"         // (opcionalno)
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

  // Dinamički sastavljamo UPDATE naredbu na temelju poslanih polja
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
 * Obriši studenta po id-u. Zbog ON DELETE CASCADE, brišu se i eventualni kontakt-podaci.
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
    res.json({ message: "Student obrisan (i vezani kontakt, ako je postojao).", student: result.rows[0] });
  } catch (err) {
    console.error(`Error executing DELETE FROM studenti WHERE id=${id}:`, err.stack);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /studenti/query
 * Izvrši proizvoljan SQL nad tablicom 'studenti'
 * Ovaj endpoint pogodan je samo za lokalnu vježbu (nije preporučeno na produkciji).
 *
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



/* ===========================
   CRUD ZA TABLICU 'kontakti'
   =========================== */

/**
 * GET /kontakti
 * Dohvati sve kontakte
 */
app.get("/kontakti", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM kontakti ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing SELECT * FROM kontakti:", err.stack);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /kontakti/:id
 * Dohvati jedan kontakt po id-u
 */
app.get("/kontakti/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM kontakti WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Kontakt nije pronađen" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error executing SELECT * FROM kontakti WHERE id = ${id}:`, err.stack);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /kontakti
 * Dodaj novi kontakt
 * Očekuje JSON tijelo:
 * {
 *   "student_id": broj,  // obavezno → mora referencirati postojeći redak u 'studenti'
 *   "tel": "string",     // (opcionalno)
 *   "adresa": "string"   // (opcionalno)
 * }
 */
app.post("/kontakti", async (req, res) => {
  const { student_id, tel, adresa } = req.body;

  // Provjera obveznog polja student_id
  if (!student_id) {
    return res.status(400).json({ error: "Polje 'student_id' je obavezno." });
  }

  try {
    const result = await db.query(
      `INSERT INTO kontakti (student_id, tel, adresa)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [student_id, tel || null, adresa || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error executing INSERT INTO kontakti:", err.stack);
    res.status(400).json({ error: err.message });
  }
});

/**
 * PUT /kontakti/:id
 * Ažuriraj postojeći kontakt
 * Očekuje JSON tijelo koje može sadržavati neka od polja:
 * {
 *   "student_id": broj,  // moguće je premjestiti kontakt na drugog studenta
 *   "tel": "string",
 *   "adresa": "string"
 * }
 */
app.put("/kontakti/:id", async (req, res) => {
  const { id } = req.params;
  const { student_id, tel, adresa } = req.body;

  // Dinamički sastavljamo UPDATE naredbu na temelju poslanih polja
  const fields = [];
  const values = [];
  let idx = 1;

  if (student_id !== undefined) {
    fields.push(`student_id = $${idx++}`);
    values.push(student_id);
  }
  if (tel !== undefined) {
    fields.push(`tel = $${idx++}`);
    values.push(tel);
  }
  if (adresa !== undefined) {
    fields.push(`adresa = $${idx++}`);
    values.push(adresa);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: "Nema polja za ažuriranje." });
  }

  values.push(id);
  const query = `
    UPDATE kontakti
    SET ${fields.join(", ")}
    WHERE id = $${idx}
    RETURNING *
  `;

  try {
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Kontakt nije pronađen za ažuriranje." });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error executing UPDATE kontakti id=${id}:`, err.stack);
    res.status(400).json({ error: err.message });
  }
});

/**
 * DELETE /kontakti/:id
 * Obriši kontakt po ID-u
 */
app.delete("/kontakti/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM kontakti WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Kontakt nije pronađen za brisanje." });
    }
    res.json({ message: "Kontakt obrisan.", kontakt: result.rows[0] });
  } catch (err) {
    console.error(`Error executing DELETE FROM kontakti WHERE id=${id}:`, err.stack);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /studenti-kontakti
 * Dohvati sve studente zajedno s pripadajućim podacima iz 'kontakti' (LEFT JOIN).
 * Ako student nema kontakt, i dalje se vraća student, ali polja iz 'kontakti' su NULL.
 */
app.get("/studenti-kontakti", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        s.id            AS student_id,
        s.ime           AS student_ime,
        s.prezime       AS student_prezime,
        s.godina_rođenja AS student_godina_rođenja,
        s.email         AS student_email,
        k.id            AS kontakt_id,
        k.tel           AS kontakt_tel,
        k.adresa        AS kontakt_adresa
      FROM studenti s
      LEFT JOIN kontakti k
        ON s.id = k.student_id
      ORDER BY s.id ASC;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing JOIN SELECT svi studenti + kontakti:", err.stack);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Dodatni endpointi za testiranje proizvoljnog SQL-a nad tablicom 'kontakti'
 * POST /kontakti/query
 * Body: { "sql": "BILO KOJI SQL NAD TABLICOM kontakti" }
 */
app.post("/kontakti/query", async (req, res) => {
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
    console.error(`Error executing custom SQL nad 'kontakti': ${sql}`, err.stack);
    res.status(400).json({ error: err.message });
  }
});

/**
 * GET /
 * Početna ruta s kratkim uputama
 */
app.get("/", (req, res) => {
  res.send(`
    <h1>Vježba: Tablice 'studenti' i 'kontakti' (one-to-one)</h1>
    <p>CRUD operacije:</p>
    <h2>Studenti</h2>
    <ul>
      <li>GET    /studenti               – Dohvati sve studente</li>
      <li>GET    /studenti/:id           – Dohvati jednog studenta</li>
      <li>POST   /studenti               – Dodaj novog studenta</li>
      <li>PUT    /studenti/:id           – Ažuriraj postojećeg studenta</li>
      <li>DELETE /studenti/:id           – Obriši studenta (i pripadajući kontakt)</li>
      <li>POST   /studenti/query         – Testni SQL nad tablicom 'studenti'</li>
    </ul>
    <h2>Kontakti</h2>
    <ul>
      <li>GET    /kontakti               – Dohvati sve kontakte</li>
      <li>GET    /kontakti/:id           – Dohvati jedan kontakt</li>
      <li>POST   /kontakti               – Dodaj novi kontakt</li>
      <li>PUT    /kontakti/:id           – Ažuriraj postojeći kontakt</li>
      <li>DELETE /kontakti/:id           – Obriši kontakt</li>
      <li>POST   /kontakti/query         – Testni SQL nad tablicom 'kontakti'</li>
    </ul>
    <h2>Join</h2>
    <ul>
      <li>GET    /studenti-kontakti      – Dohvati sve studente + pripadajuće kontakte (LEFT JOIN)</li>
    </ul>
    <p>Korištenje: Pošaljite JSON zahtjev (npr. u Postmanu ili preko cURL) na odgovarajući endpoint.</p>
  `);
});

// Pokreni server
app.listen(port, () => {
  console.log(`Server pokrenut na http://localhost:${port}`);
});
