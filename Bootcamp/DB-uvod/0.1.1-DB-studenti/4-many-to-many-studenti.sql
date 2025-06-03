-- ===================================================================
-- Primjer M:N relacije: tablica 'studenti' ↔ tablica 'predmeti'
-- (Svaki student može pohađati više predmeta; svaki predmet može imati više studenata)
-- ===================================================================

-- 1) Tablica 'studenti' (već postoji, ali je ponovljena ovdje radi cjelovitosti)
CREATE TABLE IF NOT EXISTS studenti (
    id SERIAL PRIMARY KEY,
    ime VARCHAR(50) NOT NULL,
    prezime VARCHAR(50) NOT NULL,
    godina_rođenja INT 
      CHECK (godina_rođenja BETWEEN 1900 AND EXTRACT(YEAR FROM CURRENT_DATE)),
    email TEXT
);

-- 2) Kreiranje tablice 'predmeti' (predmetni katalog)
CREATE TABLE IF NOT EXISTS predmeti (
    id SERIAL PRIMARY KEY,
    naziv VARCHAR(100) NOT NULL,
    ects INT CHECK (ects BETWEEN 1 AND 30)
);

-- 3) Kreiranje posredne tablice 'student_predmeti' (junction table)
--    koja povezuje 'studenti' i 'predmeti' u many-to-many relaciji
CREATE TABLE IF NOT EXISTS student_predmeti (
    student_id INT NOT NULL
      REFERENCES studenti(id)
      ON DELETE CASCADE,
    predmet_id INT NOT NULL
      REFERENCES predmeti(id)
      ON DELETE CASCADE,
    PRIMARY KEY (student_id, predmet_id)
);

-- ===================================================================
-- 4) Ubacivanje par studenata (ako već nisu uneseni)
-- ===================================================================
INSERT INTO studenti (ime, prezime, godina_rođenja, email)
VALUES
  ('Ivan',    'Horvat', 1998, 'ivan.horvat@example.com'),
  ('Ana',     'Kovač',  2000, 'ana.kovac@example.com'),
  ('Marko',   'Perić',  1995, NULL),
  ('Sara',    'Novak',  1999, 'sara.novak@example.com')
ON CONFLICT DO NOTHING;

-- ===================================================================
-- 5) Ubacivanje par predmeta
-- ===================================================================
INSERT INTO predmeti (naziv, ects)
VALUES
  ('Matematika I',        6),
  ('Fizika II',           5),
  ('Programiranje',        7),
  ('Povijest umjetnosti', 4)
ON CONFLICT DO NOTHING;

-- ===================================================================
-- 6) Ubacivanje veza u 'student_predmeti' (upisi studenata na predmete)
--    Pretpostavljamo da su id-evi studenata i predmeta kako slijedi:
--      studenti: 1=Ivan, 2=Ana, 3=Marko, 4=Sara
--      predmeti: 1=Matematika I, 2=Fizika II, 3=Programiranje, 
--                4=Povijest umjetnosti
-- ===================================================================
-- Ivan (student_id = 1) pohađa Matematiku I (1) i Programiranje (3)
INSERT INTO student_predmeti (student_id, predmet_id)
VALUES
  (1, 1),
  (1, 3)
ON CONFLICT DO NOTHING;

-- Ana (student_id = 2) pohađa Programiranje (3) i Fiziku II (2)
INSERT INTO student_predmeti (student_id, predmet_id)
VALUES
  (2, 2),
  (2, 3)
ON CONFLICT DO NOTHING;

-- Marko (student_id = 3) pohađa Matematiku I (1) i Povijest umjetnosti (4)
INSERT INTO student_predmeti (student_id, predmet_id)
VALUES
  (3, 1),
  (3, 4)
ON CONFLICT DO NOTHING;

-- Sara (student_id = 4) pohađa Fiziku II (2)
INSERT INTO student_predmeti (student_id, predmet_id)
VALUES
  (4, 2)
ON CONFLICT DO NOTHING;

-- ===================================================================
-- 7) INNER JOIN: Dohvat svih studenata i predmeta koje pohađaju
-- ===================================================================
SELECT
  s.id            AS student_id,
  s.ime           AS ime_studenta,
  s.prezime       AS prezime_studenta,
  p.id            AS predmet_id,
  p.naziv         AS naziv_predmeta,
  p.ects          AS ects_bodovi
FROM studenti AS s
INNER JOIN student_predmeti AS sp
  ON s.id = sp.student_id
INNER JOIN predmeti AS p
  ON sp.predmet_id = p.id
ORDER BY s.id, p.naziv;
