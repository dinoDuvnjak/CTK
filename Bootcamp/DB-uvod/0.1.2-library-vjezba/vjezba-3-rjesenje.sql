-- 1) Kreiramo tablicu BOOKS (glavna tablica)
CREATE TABLE Books (
  id SERIAL PRIMARY KEY,
  naslov VARCHAR(100) NOT NULL,
  autor VARCHAR(100) NOT NULL,
  godina_izdanja INT 
    CHECK (godina_izdanja BETWEEN 1500 AND EXTRACT(YEAR FROM CURRENT_DATE))
);

-- 2) Kreiramo tablicu REVIEWS (svaka knjiga može imati više recenzija → 1:m)
CREATE TABLE Reviews (
  id SERIAL PRIMARY KEY,
  rating INT 
    CHECK (rating BETWEEN 1 AND 5),
  komentar TEXT,
  book_id INT NOT NULL
    REFERENCES Books(id)
    ON DELETE CASCADE
);

-- 3) Primjer ubacivanja podataka
INSERT INTO Books (naslov, autor, godina_izdanja)
VALUES
  ('Gospodar prstenova', 'J.R.R. Tolkien', 1954),
  ('Maleni princ', 'Antoine de Saint-Exupéry', 1943);

INSERT INTO Reviews (rating, komentar, book_id)
VALUES
  (5, 'Fantastičan ep – preporuka svima!', 1),
  (4, 'Odlična priča, ali malo dugačko.', 1),
  (5, 'Kratko, slatko i poučno.', 2);

-- 4) INNER JOIN: dohvat svih knjiga koje imaju barem jednu recenziju, zajedno s ocjenom i komentarom
SELECT
  b.id          AS knjiga_id,
  b.naslov,
  b.autor,
  b.godina_izdanja,
  r.id          AS recenzija_id,
  r.rating,
  r.komentar
FROM Books AS b
INNER JOIN Reviews AS r
  ON b.id = r.book_id
ORDER BY b.id, r.id;
