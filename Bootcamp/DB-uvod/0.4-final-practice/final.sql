-- Kreiranje tablica

-- Brisanje postojećih tablica ako postoje (za potrebe ponovnog izvršavanja skripte)
DROP TABLE IF EXISTS items_tags;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS stores;
DROP TABLE IF EXISTS users;

-- Kreiranje tablice korisnika
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    password VARCHAR(80) NOT NULL
);

-- Kreiranje tablice trgovina
CREATE TABLE stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) UNIQUE NOT NULL
);

-- Kreiranje tablice artikala
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    store_id INTEGER NOT NULL,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
);

-- Kreiranje tablice oznaka
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    store_id INTEGER NOT NULL,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
);

-- Kreiranje tablice veze između artikala i oznaka
CREATE TABLE items_tags (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE (item_id, tag_id)  -- Osigurava da ne može postojati dupla veza
);

-- Dodavanje testnih podataka

-- Dodavanje korisnika
INSERT INTO users (username, password) VALUES
    ('admin', 'admin123'),
    ('prodavac1', 'lozinka123'),
    ('marko', 'sigurna456');

-- Dodavanje trgovina
INSERT INTO stores (name) VALUES
    ('Trgovina Elektronike'),
    ('Supermarket'),
    ('Sportska Oprema');

-- Dodavanje artikala
INSERT INTO items (name, price, store_id) VALUES
    ('Laptop', 899.99, 1),
    ('Smartphone', 499.99, 1),
    ('Slušalice', 79.99, 1),
    ('Mlijeko', 1.29, 2),
    ('Kruh', 0.99, 2),
    ('Sir', 3.99, 2),
    ('Tenisice', 89.99, 3),
    ('Nogometna lopta', 29.99, 3),
    ('Bicikl', 299.99, 3);

-- Dodavanje oznaka
INSERT INTO tags (name, store_id) VALUES
    ('Računala', 1),
    ('Mobiteli', 1),
    ('Akcija', 1),
    ('Mliječni proizvodi', 2),
    ('Pekara', 2),
    ('Organski proizvodi', 2),
    ('Obuća', 3),
    ('Sportska oprema', 3),
    ('Outdoor', 3);

-- Dodavanje veza između artikala i oznaka
INSERT INTO items_tags (item_id, tag_id) VALUES
    (1, 1),  -- Laptop - Računala
    (1, 3),  -- Laptop - Akcija
    (2, 2),  -- Smartphone - Mobiteli
    (2, 3),  -- Smartphone - Akcija
    (3, 3),  -- Slušalice - Akcija
    (4, 4),  -- Mlijeko - Mliječni proizvodi
    (4, 6),  -- Mlijeko - Organski proizvodi
    (5, 5),  -- Kruh - Pekara
    (6, 4),  -- Sir - Mliječni proizvodi
    (7, 7),  -- Tenisice - Obuća
    (8, 8),  -- Nogometna lopta - Sportska oprema
    (9, 8),  -- Bicikl - Sportska oprema
    (9, 9);  -- Bicikl - Outdoor