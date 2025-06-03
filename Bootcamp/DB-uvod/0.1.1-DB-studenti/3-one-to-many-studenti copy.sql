-- ===================================================================
-- Primjer 1:M relacije: tablica 'studenti' (roditelj) → tablica 'ispiti' (dijete)
-- ===================================================================

-- 1) Ako već nemate, kreirajte tablicu 'studenti' (isti oblik kao ranije):
CREATE TABLE IF NOT EXISTS studenti (
    id SERIAL PRIMARY KEY,
    ime VARCHAR(50) NOT NULL,
    prezime VARCHAR(50) NOT NULL,
    godina_rođenja INT 
      CHECK (godina_rođenja BETWEEN 1900 AND EXTRACT(YEAR FROM CURRENT_DATE)),
    email TEXT
);

-- 2) Kreiramo tablicu 'ispiti' (svaki student može polagati više ispita – 1:M relacija)
--    Polje 'student_id' je vanjski ključ koji upućuje na 'studenti(id)'.
--    ON DELETE CASCADE osigurava da se svi ispiti obrišu ako se obriše student.
CREATE TABLE IF NOT EXISTS ispiti (
    id SERIAL PRIMARY KEY,
    predmet VARCHAR(100) NOT NULL,
    ocjena INT CHECK (ocjena BETWEEN 1 AND 5),
    datum_ispita DATE NOT NULL DEFAULT CURRENT_DATE,
    student_id INT NOT NULL
        REFERENCES studenti(id)
        ON DELETE CASCADE
);

-- ===================================================================
-- 3) Ubacivanje nekoliko studenata i njihovih ispita radi testiranja
-- ===================================================================

-- Ubacimo par studenata (ako tablica već ima podatke, ova naredba neće duplicirati zbog ON CONFLICT DO NOTHING)
INSERT INTO studenti (ime, prezime, godina_rođenja, email)
VALUES
  ('Ivan',    'Horvat', 1998, 'ivan.horvat@example.com'),
  ('Ana',     'Kovač',  2000, 'ana.kovac@example.com'),
  ('Marko',   'Perić',  1995, NULL),
  ('Sara',    'Novak',  1999, 'sara.novak@example.com')
ON CONFLICT DO NOTHING;

-- Ubacivanje ispita za studente
-- Ivan (student_id = 1) polaže dva ispita:
INSERT INTO ispiti (predmet, ocjena, datum_ispita, student_id)
VALUES
  ('Matematika',    5, '2025-06-01', 1),
  ('Fizika',        4, '2025-06-10', 1),

-- Ana (student_id = 2) polaže jedan ispit:
  ('Programiranje', 5, '2025-06-05', 2),

-- Marko (student_id = 3) polaže dva ispita:
  ('Engleski',      3, '2025-05-30', 3),
  ('Povijest',      4, '2025-06-02', 3);

-- ===================================================================
-- 4) INNER JOIN: dohvat svih ispita zajedno s podacima o studentima
-- ===================================================================
SELECT
  s.id           AS student_id,
  s.ime          AS ime_studenta,
  s.prezime      AS prezime_studenta,
  i.id           AS ispit_id,
  i.predmet,
  i.ocjena,
  i.datum_ispita
FROM studenti AS s
INNER JOIN ispiti AS i
  ON s.id = i.student_id
ORDER BY s.id, i.datum_ispita;

-- ===================================================================
-- 5) (Opcionalno) LEFT JOIN: dohvat svih studenata i njihovih ispita (ako postoje)
-- ===================================================================
-- Studenti koji nemaju ispita i dalje će se prikazati, s poljima iz 'ispiti' postavljenim na NULL.
SELECT
  s.id           AS student_id,
  s.ime          AS ime_studenta,
  s.prezime      AS prezime_studenta,
  i.id           AS ispit_id,
  i.predmet,
  i.ocjena,
  i.datum_ispita
FROM studenti AS s
LEFT JOIN ispiti AS i
  ON s.id = i.student_id
ORDER BY s.id, i.datum_ispita;
