-- ===================================================================
-- SQL Script: Tablica 'studenti' + vježbica sa ALTER, UPDATE, DELETE i ORDER BY
-- Opis: Ovaj skript stvara tablicu 'studenti', zatim demonstrira:
--   1) dodavanje novog stupca sa ALTER TABLE
--   2) ažuriranje (UPDATE) e-maila
--   3) brisanje (DELETE) retka
--   4) dohvat (SELECT) uz ORDER BY
-- Možete ga kopirati i pokrenuti u svom SQL-klijentu (psql, pgAdmin, DBeaver itd.).
-- ===================================================================

-- 1) Kreiranje tablice 'studenti'
--    Ako tablica već postoji, preskočite ovaj dio ili koristite "CREATE TABLE IF NOT EXISTS".
CREATE TABLE IF NOT EXISTS studenti (
    -- id: automatski jedinstveni identifikator
    id SERIAL PRIMARY KEY,
    
    -- ime i prezime studenta, obavezna polja
    ime VARCHAR(50) NOT NULL,
    prezime VARCHAR(50) NOT NULL,
    
    -- godina_rođenja: cijeli broj, mora biti između 1900 i tekuće godine
    godina_rođenja INT 
      CHECK (godina_rođenja BETWEEN 1900 AND EXTRACT(YEAR FROM CURRENT_DATE)),
    
    -- email: opcionalno polje za e-mail adresu
    email TEXT
);

-- (Opcionalno) Ubacivanje par testnih podataka radi provjere:
INSERT INTO studenti (ime, prezime, godina_rođenja, email)
VALUES
  ('Ivan',    'Horvat', 1998, 'ivan.horvat@example.com'),
  ('Ana',     'Kovač',  2000, 'ana.kovac@example.com'),
  ('Marko',   'Perić',  1995, NULL),
  ('Sara',    'Novak',  1999, 'sara.novak@example.com'),
  ('Petar',   'Matić',  2001, 'petar.matic@example.com')
ON CONFLICT DO NOTHING; 
-- Napomena: Ako već postoje studenti s tim ID-evima, nećemo duplirati.


-- preimenuj tablicu 'studenti' ako već postoji
ALTER TABLE IF EXISTS studenti
  RENAME TO studenti1;

-- =========================================================================
-- 2) ALTER TABLE: Dodavanje novog stupca 'smjer' sa ZADANOM vrijednošću
-- =========================================================================
-- Opis: Novi stupac 'smjer' će se postaviti na 'Nepoznato' za sve postojeće i buduće retke,
--       osim ako prilikom INSERT-a eksplicitno ne navedete drugu vrijednost.
ALTER TABLE studenti
  ADD COLUMN IF NOT EXISTS smjer VARCHAR(50) DEFAULT 'Nepoznato';

-- (Opcionalno) Provjerite da je stupac dodan i da postojeće retke imaju vrijednost 'Nepoznato':
-- SELECT id, ime, prezime, smjer FROM studenti LIMIT 5;



-- promjena tipa stupca 'godina_rođenja' na 'godina_rođenja' INT
ALTER TABLE studenti
  ALTER COLUMN godina_rođenja TYPE INT;

-- =========================================================================
-- 3) UPDATE: Ažuriranje e-maila studenta s ID-em 2
-- =========================================================================
-- Opis: Postavljamo polje 'email' za studenta s ID = 2 na novu adresu.
UPDATE studenti
SET email = 'novi.email@email.com'
WHERE id = 2;

-- (Opcionalno) Provjerite promjenu:
-- SELECT id, ime, prezime, email FROM studenti WHERE id = 2;


-- =========================================================================
-- 4) DELETE: Brisanje studenta s ID-em 5
-- =========================================================================
-- Opis: Brišemo retka s id = 5. Prije brisanja, možete provjeriti postoji li taj student:
--       SELECT * FROM studenti WHERE id = 5;
DELETE FROM studenti
WHERE id = 5;

-- (Opcionalno) Provjerite je li student izbrisan:
-- SELECT * FROM studenti WHERE id = 5;


-- =========================================================================
-- 5) SELECT + ORDER BY: Dohvat svih studenata, sortirano prema prezimenu uzlazno
-- =========================================================================
-- Opis: Prikazujemo sve stupce (id, ime, prezime, godina_rođenja, email, smjer),
--       sortirano po prezimenu (ABECEDNO).
SELECT
  id,
  ime,
  prezime,
  godina_rođenja,
  email,
  smjer
FROM studenti
ORDER BY prezime ASC;

-- ===================================================================
-- Kraj skripta
-- ===================================================================


-- DROP TABLE studenti; -- Ova linija se koristi za brisanje tablice 'studenti' ako je potrebno
DROP TABLE IF EXISTS studenti;