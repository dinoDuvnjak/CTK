-- ------------------------------------------------------
-- 1) Kreiranje tablice 'Books'
-- ------------------------------------------------------

CREATE TABLE Books (
  id SERIAL PRIMARY KEY,
  naslov VARCHAR(100) NOT NULL,
  autor_glavni VARCHAR(100) NOT NULL,
  godina_izdanja INT 
    CHECK (godina_izdanja BETWEEN 1500 AND EXTRACT(YEAR FROM CURRENT_DATE))
);

-- ------------------------------------------------------
-- 2) Kreiranje tablice 'Authors'
-- ------------------------------------------------------

CREATE TABLE Authors (
  id SERIAL PRIMARY KEY,
  ime VARCHAR(50) NOT NULL,
  prezime VARCHAR(50) NOT NULL,
  rok_život INT 
    CHECK (rok_život BETWEEN 1000 AND EXTRACT(YEAR FROM CURRENT_DATE))
    NULL
);

-- ------------------------------------------------------
-- 3) Kreiranje posredne tablice 'Book_Authors'
--    (M:N relacija: jedna knjiga ↔ više autora; jedan autor ↔ više knjiga)
-- ------------------------------------------------------

CREATE TABLE Book_Authors (
  book_id   INT NOT NULL
    REFERENCES Books(id)
    ON DELETE CASCADE,
  author_id INT NOT NULL
    REFERENCES Authors(id)
    ON DELETE CASCADE,
  PRIMARY KEY (book_id, author_id)
);

-- ------------------------------------------------------
-- 4) Ubacivanje primjera podataka u tablice 'Books' i 'Authors'
-- ------------------------------------------------------

-- 4.1. Ubacujemo knjige
INSERT INTO Books (naslov, autor_glavni, godina_izdanja)
VALUES
  ('Gospodar prstenova',    'J.R.R. Tolkien',         1954),
  ('Kratki povratak',       'Ivo Andrić',             1945),
  ('Na Drini ćuprija',      'Ivo Andrić',             1945);

-- 4.2. Ubacujemo autore
INSERT INTO Authors (ime, prezime, rok_život)
VALUES
  ('J.R.R.',   'Tolkien',     1973),
  ('George',   'Orwell',      1950),
  ('Ivo',      'Andrić',      1975),
  ('Antoine',  'Saint-Exupéry',1944);

-- ------------------------------------------------------
-- 5) Ubacivanje veza u posrednu tablicu 'Book_Authors'
-- ------------------------------------------------------

-- Knjiga 1 = 'Gospodar prstenova' ima autora 1 (Tolkien) i autora 2 (Orwell)
INSERT INTO Book_Authors (book_id, author_id)
VALUES
  (1, 1),
  (1, 2);

-- Knjiga 2 = 'Kratki povratak' ima samo autora 3 (Ivo Andrić)
INSERT INTO Book_Authors (book_id, author_id)
VALUES
  (2, 3);

-- Knjiga 3 = 'Na Drini ćuprija' ima autora 3 (Ivo Andrić) i autora 4 (Antoine Saint-Exupéry)
INSERT INTO Book_Authors (book_id, author_id)
VALUES
  (3, 3),
  (3, 4);

-- ------------------------------------------------------
-- 6) INNER JOIN: Dohvat svih knjiga i njihovih autora
-- ------------------------------------------------------

SELECT
  b.id           AS knjiga_id,
  b.naslov       AS naslov_knjige,
  b.autor_glavni AS primarni_autor,
  b.godina_izdanja,
  a.id           AS autor_id,
  a.ime          AS autor_ime,
  a.prezime      AS autor_prezime
FROM Books AS b
INNER JOIN Book_Authors AS ba
  ON b.id = ba.book_id
INNER JOIN Authors AS a
  ON ba.author_id = a.id
ORDER BY b.id, a.id;
