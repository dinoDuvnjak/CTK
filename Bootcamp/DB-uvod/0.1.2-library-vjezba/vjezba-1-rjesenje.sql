-- DDL za tablicu 'knjige'
CREATE TABLE knjige (
  id SERIAL PRIMARY KEY,
  naslov VARCHAR(100) NOT NULL,
  autor VARCHAR(100) NOT NULL,
  godina_izdanja INT CHECK (godina_izdanja BETWEEN 1500 AND EXTRACT(YEAR FROM CURRENT_DATE)),
  zanr TEXT
);

-- 1) Dohvati sve knjige (redoslijed po id uzlazno)
SELECT * FROM knjige
ORDER BY id ASC;

-- 2) Dohvati jednu knjigu po ID-u
SELECT * FROM knjige
WHERE id = $1;

-- 3) Umetni novu knjigu
INSERT INTO knjige (naslov, autor, godina_izdanja, zanr)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- 4) Ažuriraj postojeću knjigu (primjer dinamički generiranog UPDATEa; $1…$n su odgovarajući parametri)
UPDATE knjige
SET
  naslov = $1,
  autor = $2,
  godina_izdanja = $3,
  zanr = $4
WHERE id = $5
RETURNING *;

-- 5) Obriši knjigu po ID-u
DELETE FROM knjige
WHERE id = $1
RETURNING *;

-- 6) Proizvoljan SQL nad tablicom 'knjige' (kada se pozove /knjige/query)
-- Primjer:
SELECT * FROM knjige
WHERE autor = 'Ivo Andrić';
