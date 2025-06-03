-- ===================================================================
-- Primjer 1:1 relacije: tablica 'studenti' ↔ tablica 'adrese_studenata'
-- (Svaki student može imati točno jednu adresu; svaka adresa pripada točno jednom studentu)
-- ===================================================================

-- 1) Tablica 'studenti' (isti oblik kao ranije)
CREATE TABLE IF NOT EXISTS studenti (
    id SERIAL PRIMARY KEY,
    ime VARCHAR(50) NOT NULL,
    prezime VARCHAR(50) NOT NULL,
    godina_rođenja INT 
      CHECK (godina_rođenja BETWEEN 1900 AND EXTRACT(YEAR FROM CURRENT_DATE)),
    email TEXT
);

-- 2) Kreiranje tablice 'adrese_studenata' (one-to-one relacija)
--    Polje 'student_id' je vanjski ključ na 'studenti(id)' i mora biti UNIQUE,
--    tako da svaki student može imati najviše jedan redak u ovoj tablici.
CREATE TABLE IF NOT EXISTS adrese_studenata (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL
      REFERENCES studenti(id)
      ON DELETE CASCADE,
    ulica VARCHAR(100) NOT NULL,
    grad VARCHAR(50) NOT NULL,
    posta INT CHECK (posta BETWEEN 10000 AND 99999),
    UNIQUE (student_id)
);

-- ===================================================================
-- 3) Ubacivanje primjera podataka
-- ===================================================================

-- 3.1. Ubacujemo par studenata (ako već nisu uneseni)
INSERT INTO studenti (ime, prezime, godina_rođenja, email)
VALUES
  ('Ivan',   'Horvat',  1998, 'ivan.horvat@example.com'),
  ('Ana',    'Kovač',   2000, 'ana.kovac@example.com'),
  ('Marko',  'Perić',   1995, NULL),
  ('Sara',   'Novak',   1999, 'sara.novak@example.com')
ON CONFLICT DO NOTHING;

-- 3.2. Ubacujemo adrese (za neke studente)
--      Svaki student_id smije se pojaviti samo jednom
INSERT INTO adrese_studenata (student_id, ulica, grad, posta)
VALUES
  (1, 'Zagrebačka 10',  'Zagreb', 10000),
  (2, 'Istarska 5',     'Pula',   52100),
  (4, 'Splitska 20',    'Split',  21000)
ON CONFLICT DO NOTHING;
-- (Student_id = 3 zasad nema adresu)

-- ===================================================================
-- 4) INNER JOIN: dohvat studenata koji imaju adresu
-- ===================================================================
SELECT
  s.id           AS student_id,
  s.ime,
  s.prezime,
  s.godina_rođenja,
  s.email,
  a.ulica,
  a.grad,
  a.posta
FROM studenti AS s
INNER JOIN adrese_studenata AS a
  ON s.id = a.student_id
ORDER BY s.id;

-- Rezultat će prikazati samo one studente za koje postoji zapis u 'adrese_studenata':
--   student_id = 1 (Ivan Horvat)
--   student_id = 2 (Ana Kovač)
--   student_id = 4 (Sara Novak)
-- Student s student_id = 3 (Marko Perić) neće se pojaviti, jer nema adresu u 'adrese_studenata'.

-- ===================================================================
-- 5) (Opcionalno) LEFT JOIN: dohvat svih studenata + eventualne adrese
-- ===================================================================
-- Studenti bez adrese će imati NULL vrijednosti za polja u tablici 'adrese_studenata'.
SELECT
  s.id           AS student_id,
  s.ime,
  s.prezime,
  s.godina_rođenja,
  s.email,
  a.ulica,
  a.grad,
  a.posta
FROM studenti AS s
LEFT JOIN adrese_studenata AS a
  ON s.id = a.student_id
ORDER BY s.id;
