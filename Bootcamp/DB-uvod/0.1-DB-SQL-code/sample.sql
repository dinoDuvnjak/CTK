-- Kreira tablicu 'friends' s novim značajkama
CREATE TABLE friends (
    -- id: automatski se numerira i jedinstven je (SERIAL PRIMARY KEY)
    id SERIAL PRIMARY KEY,
    
    -- name: koristi TEXT umjesto VARCHAR(50) – fleksibilnija pohrana imena
    name TEXT,
    
    -- age: pohranjuje cijele brojeve, a CHECK (age > 0) osigurava da dob ne može biti negativna
    age INT CHECK (age > 0),
    
    -- is_cool: pohranjuje true/false vrijednosti, DEFAULT false postavlja zadanu vrijednost na false
    is_cool BOOLEAN DEFAULT false
);



-- Example SQL code for creating a table:
CREATE TABLE products (
  id INT NOT NULL,
  name TEXT,
  price MONEY,
  PRIMARY KEY (id)
);

-- Example of adding the first product:
INSERT INTO products (id, name, price)
VALUES (1, 'Pen', 1.20);

-- Example of adding the second product, but without a price:
INSERT INTO products (id, name)
VALUES (2, 'Pencil');

-- Example of adding the third product, without an ID (THIS WILL CAUSE AN ERROR):
INSERT INTO products (name, price)
VALUES ('Eraser', 1.30);

-- Retrieve all products:
SELECT * FROM products;

-- Retrieve only the product names and prices:
SELECT name, price FROM products;

-- Filtering data:
SELECT * FROM products WHERE id = 1;
SELECT * FROM products WHERE price BETWEEN 1.00 AND 2.00;
SELECT * FROM products WHERE name LIKE 'P%';

-- Updating data:
UPDATE table_name  
SET column_name = new_value  
WHERE condition;

-- Updating multiple columns at once:
UPDATE products  
SET name = 'Premium Pen', price = 2.00  
WHERE id = 1;

-- Deleting data:
DELETE FROM products  
WHERE id = 2;

-- SQL Relationships and JOINs:
-- (Adding a product with an extra column 'stock' for later use)
INSERT INTO products (id, name, price, stock)
VALUES (2, 'Pencil', 0.8, 12);

CREATE TABLE orders (
    id INT NOT NULL,         -- Unique order identifier (Primary Key).
    order_number INT,        -- Order number.
    customer_id INT,         -- Customer ID (Foreign Key that references the 'customers' table).
    product_id INT,          -- Product ID (Foreign Key that references the 'products' table).
    PRIMARY KEY (id),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Adding the first order:
INSERT INTO orders (id, order_number, customer_id, product_id)
VALUES (1, 4362, 2, 1);

-- Inner join: joining orders with customers:
SELECT orders.order_number, customers.first_name, customers.last_name, customers.address
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id;

-- Inner join: joining orders with products (exercise 1):
SELECT orders.order_number, products.name, products.price, products.stock
FROM orders
INNER JOIN products ON orders.product_id = products.id;

-- Inner join: joining orders with both customers and products (exercise 2):
SELECT orders.order_number, customers.first_name, customers.last_name, products.name, products.price
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id
INNER JOIN products ON orders.product_id = products.id;


--  1:1
CREATE TABLE studenti (
    id SERIAL PRIMARY KEY,
    ime VARCHAR(50),
    prezime VARCHAR(50)
);

CREATE TABLE kontakti (
    id INT UNIQUE REFERENCES studenti(id),
    telefon VARCHAR(20),
    adresa VARCHAR(100)
);

INSERT INTO studenti (ime, prezime) VALUES ('Marko', 'Marić');
INSERT INTO kontakti (id, telefon, adresa) VALUES (1, '0911234567', 'Ulica 123, Zagreb');

SELECT * FROM studenti 
INNER JOIN kontakti ON studenti.id = kontakti.id;

-- 1:M
CREATE TABLE studenti (
    id SERIAL PRIMARY KEY,
    ime VARCHAR(50),
    prezime VARCHAR(50)
);

CREATE TABLE zadace (
    id SERIAL PRIMARY KEY,
    ocjena INT,
    student_id INT REFERENCES studenti(id)
);

INSERT INTO studenti (ime, prezime) VALUES 
('Marko', 'Marić'),
('Ana', 'Anić');

INSERT INTO zadace (ocjena, student_id) VALUES 
(5, 1),  -- Marko je dobio 5
(4, 1),  -- Marko je dobio 4
(3, 2);  -- Ana je dobila 3

SELECT studenti.ime, studenti.prezime, zadace.ocjena 
FROM studenti 
INNER JOIN zadace ON studenti.id = zadace.student_id;

SELECT studenti.ime, studenti.prezime, zadace.ocjena 
FROM studenti 
INNER JOIN zadace ON studenti.id = zadace.student_id
WHERE studenti.ime = 'Marko' AND studenti.prezime = 'Marić';

-- m:m
CREATE TABLE studenti (
    id SERIAL PRIMARY KEY,
    ime VARCHAR(50),
    prezime VARCHAR(50)
);

CREATE TABLE predmeti (
    id SERIAL PRIMARY KEY,
    naziv VARCHAR(50)
);

CREATE TABLE upisi (
    student_id INT REFERENCES studenti(id),
    predmet_id INT REFERENCES predmeti(id),
    PRIMARY KEY (student_id, predmet_id)
);

INSERT INTO studenti (ime, prezime) VALUES 
('Marko', 'Marić'),
('Ana', 'Anić');

INSERT INTO predmeti (naziv) VALUES 
('Matematika'),
('Fizika'),
('Engleski');

INSERT INTO upisi (student_id, predmet_id) VALUES 
(1, 1),  -- Marko je upisan na Matematiku
(1, 2),  -- Marko je upisan na Fiziku
(2, 2),  -- Ana je upisana na Fiziku
(2, 3);  -- Ana je upisana na Engleski

--- ALTER TABLE ----

-- Preimenuje tablicu studenti u korisnici
ALTER TABLE studenti RENAME TO korisnici;

-- Dodavanje novog stupca
ALTER TABLE studenti ADD COLUMN email TEXT;

-- Promjena tipa stupca
ALTER TABLE studenti ALTER COLUMN email TYPE VARCHAR(100);

-- Brisanje tablice
DROP TABLE IF EXISTS studenti;

-- Postavlja ime korisnika s id = 1 na "Angelina".
UPDATE korisnici SET ime = 'Angelina' WHERE id = 1;

-- Povećavanje ocjene svim studentima
UPDATE studenti SET ocjena = ocjena + 1 WHERE ocjena < 5;

-- Brisanje korisnika s id = 3
DELETE FROM korisnici WHERE id = 3;

-- Brisanje svih studenata s ocjenom manjom od 2
DELETE FROM studenti WHERE ocjena < 2;

-- OPREZ! Briše sve korisnike!
DELETE FROM korisnici;  -- Briše sve korisnike!

-- Prikazuje sve korisnike sortirane po imenu u uzlaznom redoslijedu
SELECT * FROM korisnici ORDER BY ime ASC;

-- Prikazuje sve korisnike sortirane po prezimenu u silaznom redoslijedu
SELECT * FROM korisnici ORDER BY prezime DESC;







