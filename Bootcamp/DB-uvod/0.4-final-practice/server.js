// server.js
// CRUD operacije i prilagođeni JSON odgovori za 'stores' i 'items'
// Prije pokretanja:
// 1. npm install express body-parser pg
// 2. Imajte u bazi (npr. "shop") tablice users, stores, items, tags, items_tags prema primjeru
// 3. node server.js

import express from "express";
import bodyParser from "body-parser";
import { Client } from "pg";

const db = new Client({
  user: "postgres",         // prilagodite prema svojoj konfiguraciji
  host: "localhost",
  database: "shop",         // ime vaše baze
  password: "dduvnja6", // zamijenite stvarnom lozinkom
  port: 5432,
});

const app = express();
const port = 3000;
app.use(bodyParser.json());

db.connect()
  .then(() => console.log("Connected to PostgreSQL (shop)"))
  .catch((err) => {
    console.error("Ne mogu se spojiti na bazu:", err.stack);
    process.exit(1);
  });

/* ============================
   CRUD ZA TABLICU stores (s ugrađenim nested JSON)
   ============================ */

/**
 * GET /stores
 * Vraća sve trgovine u formatu:
 * [
 *   {
 *     "id": 1,
 *     "name": "Plodine",
 *     "items": [
 *       { "id": 1, "name": "ormar", "price": 20 },
 *       ...
 *     ],
 *     "tags": [
 *       { "id": 1, "name": "supermarket" },
 *       ...
 *     ]
 *   },
 *   ...
 * ]
 */

app.get("/stores", async (req, res) => {
  try {
    // dohvatimo trgovine + artikle u jednom result setu
    const sql = `
      SELECT
        s.id   AS store_id,
        s.name AS store_name,
        i.id   AS item_id,
        i.name AS item_name,
        i.price
      FROM stores s
      LEFT JOIN items i
        ON i.store_id = s.id
      ORDER BY s.id, i.id
    `;
    const { rows } = await db.query(sql);

    // grupiramo redove prema store_id
    const storesMap = new Map();
    for (let row of rows) {
      // ako prvi put vidimo ovu trgovinu, inicijaliziramo objekt
      if (!storesMap.has(row.store_id)) {
        storesMap.set(row.store_id, {
          id:    row.store_id,
          name:  row.store_name,
          items: []
        });
      }
      // ako postoji artikl (LEFT JOIN može vratiti null za i.id)
      if (row.item_id !== null) {
        storesMap.get(row.store_id).items.push({
          id:    row.item_id,
          name:  row.item_name,
          price: row.price
        });
      }
    }

    // pretvorimo Map u običan niz objekata
    const stores = Array.from(storesMap.values());
    res.json(stores);

  } catch (err) {
    console.error("Error fetching stores:", err.stack);
    res.status(500).json({ error: err.message });
  }
});

app.get("/stores", async (req, res) => {
  try {
    // Prvo dohvatimo sve trgovine
    const storesResult = await db.query("SELECT id, name FROM stores ORDER BY id ASC");
    const stores = storesResult.rows;

    // Za svaki store dohvatimo njegove items i tags
    for (let store of stores) {
      // Dohvaćamo artikle (items) za tu trgovinu
      const itemsResult = await db.query(
        "SELECT id, name, price FROM items WHERE store_id = $1 ORDER BY id ASC",
        [store.id]
      );
      store.items = itemsResult.rows;

      // Dohvaćamo oznake (tags) za tu trgovinu
      const tagsResult = await db.query(
        "SELECT id, name FROM tags WHERE store_id = $1 ORDER BY id ASC",
        [store.id]
      );
      store.tags = tagsResult.rows;
    }

    res.json(stores);
  } catch (err) {
    console.error("Error fetching stores:", err.stack);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /stores
 * Dodaje novu trgovinu i vraća je u formatu:
 * {
 *   "id": 2,
 *   "name": "Brodokomerc",
 *   "items": [],
 *   "tags": []
 * }
 * Body: { "name": "string" }
 */
app.post("/stores", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "name je obavezno" });
  }
  try {
    // Umetnemo novu trgovinu
    const insertResult = await db.query(
      `INSERT INTO stores (name)
       VALUES ($1)
       RETURNING id, name`,
      [name]
    );
    const store = insertResult.rows[0];
    // Po definiciji, tek stvorena trgovina nema items ni tags
    store.items = [];
    store.tags = [];
    res.status(201).json(store);
  } catch (err) {
    console.error("Error inserting store:", err.stack);
    res.status(400).json({ error: err.message });
  }
});

/* ============================
   CRUD ZA TABLICU items (s ugrađenim nested JSON)
   ============================ */

/**
 * GET /items
 * Vraća sve artikle u formatu:
 * [
 *   {
 *     "id": 1,
 *     "name": "ormar",
 *     "price": 20,
 *     "store": { "id": 1, "name": "Plodine" },
 *     "tags": [
 *       { "id": 1, "name": "supermarket" },
 *       ...
 *     ]
 *   },
 *   ...
 * ]
 */
app.get("/items", async (req, res) => {
  try {
    // Dohvatimo sve artikle zajedno s njihovom trgovinom
    const itemsResult = await db.query(`
      SELECT 
        i.id AS item_id,
        i.name AS item_name,
        i.price AS item_price,
        s.id AS store_id,
        s.name AS store_name
      FROM items i
      INNER JOIN stores s ON i.store_id = s.id
      ORDER BY i.id ASC
    `);
    const items = itemsResult.rows.map(row => ({
      id: row.item_id,
      name: row.item_name,
      price: parseFloat(row.item_price),
      store: {
        id: row.store_id,
        name: row.store_name
      },
      tags: [] // popunit ćemo u nastavku
    }));

    // Za svaki artikal dohvatimo njegove tagove
    for (let item of items) {
      const tagsResult = await db.query(
        `
        SELECT t.id, t.name 
        FROM tags t
        INNER JOIN items_tags it ON t.id = it.tag_id
        WHERE it.item_id = $1
        ORDER BY t.id ASC
        `,
        [item.id]
      );
      item.tags = tagsResult.rows;
    }

    res.json(items);
  } catch (err) {
    console.error("Error fetching items:", err.stack);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /items
 * Dodaje novi artikal i vraća ga u formatu:
 * {
 *   "id": 2,
 *   "name": "kljuc",
 *   "price": 20,
 *   "store": { "id": 1, "name": "Plodine" },
 *   "tags": []
 * }
 * Body: { "name": "string", "price": broj, "store_id": broj }
 */
app.post("/items", async (req, res) => {
  const { name, price, store_id } = req.body;
  if (!name || price == null || !store_id) {
    return res.status(400).json({ error: "name, price i store_id su obavezni" });
  }
  try {
    // Umetnemo novi artikal
    const insertResult = await db.query(
      `INSERT INTO items (name, price, store_id)
       VALUES ($1, $2, $3)
       RETURNING id, name, price, store_id`,
      [name, price, store_id]
    );
    const row = insertResult.rows[0];

    // Dohvatimo naziv trgovine za novi artikal
    const storeResult = await db.query(
      "SELECT id, name FROM stores WHERE id = $1",
      [row.store_id]
    );
    const store = storeResult.rows[0];

    // Vrati formatirani JSON
    res.status(201).json({
      id: row.id,
      name: row.name,
      price: parseFloat(row.price),
      store: {
        id: store.id,
        name: store.name
      },
      tags: [] // po definiciji, tek stvoreni artikal nema tagove
    });
  } catch (err) {
    console.error("Error inserting item:", err.stack);
    res.status(400).json({ error: err.message });
  }
});

/* ============================
   OSTALI CRUD ENDPOINTI (po potrebi)
   ============================ */

// ... (ovdje možete imati ostale endpoint-e za users, tags, items_tags itd.)

/**
 * GET /
 * Početna ruta s kratkim uputama
 */
app.get("/", (req, res) => {
  res.send(`
    <h1>CRUD: stores i items (s ugrađenim nested JSON)</h1>
    <ul>
      <li>GET  /stores       – Dohvati sve trgovine + items + tags (nested JSON)</li>
      <li>POST /stores       – Dodaj trgovinu i vrati je u istom formatu</li>
      <li>GET  /items        – Dohvati sve artikle + store + tags (nested JSON)</li>
      <li>POST /items        – Dodaj artikal i vrati ga u istom formatu</li>
    </ul>
    <p>Pošaljite JSON u tijelo zahtjeva za POST operacije.</p>
  `);
});

app.listen(port, () => {
  console.log(`Server pokrenut na http://localhost:${port}`);
});
