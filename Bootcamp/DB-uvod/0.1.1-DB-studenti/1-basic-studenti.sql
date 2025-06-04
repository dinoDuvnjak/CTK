
-- PostgreSQL nudi širi raspon tipova podataka u odnosu na standardni SQL.
-- 🔹 Tekstualni podaci:
-- VARCHAR(n) – Varijabilna duljina teksta (maksimalno n - ali iskoristeno je memorije Koliko ima znakova znakova)- 
-- CHAR(50) -fiksira memoriju na vrijednost koja je unesena
-- TEXT – Neograničena duljina teksta, malo je sporiji ali nije strasno
-- 🔹 Brojevi:
-- INT – Cijeli brojevi
-- BIGINT – Veliki cijeli brojevi (za milijarde zapisa)
-- DECIMAL(10,2) – Decimalni brojevi (npr. cijene)
-- 🔹 Datum i vrijeme:
-- DATE – Pohranjuje samo datum
-- TIMESTAMP – Pohranjuje datum i vrijeme
-- 🔹 Ostalo:
-- BOOLEAN – true / false vrijednosti
-- SERIAL – Auto-incrementing broj za primarne ključeve
-- 📌 Koji format koristiti za tekst?
-- VARCHAR(50) = ograničenje na 50 znakova, - TEXT = nema ograničenja





-- Kreiranje tablice 'studenti'
CREATE TABLE studenti (
    -- id: automatski jedinstveni identifikator
    id SERIAL PRIMARY KEY NOT NULL,
    
    -- ime i prezime studenta, obavezna polja
    ime VARCHAR(50) NOT NULL,
    prezime VARCHAR(50) NOT NULL,
    
    -- godina_rođenja: cijeli broj, ne može biti manj od 1900 ili veći od trenutne godine
    godina_rođenja INT CHECK (godina_rođenja BETWEEN 1900 AND EXTRACT(YEAR FROM CURRENT_DATE)),
    
    -- email: opcionalno polje za e-mail adresu
    email TEXT
);


-- ──────────────────────────────────────────────────────────
-- 1. INSERT primjeri u tablici 'studenti'
-- ──────────────────────────────────────────────────────────

-- 1.a. Ispravno dodavanje prvog studenta (svi obavezni podaci)
INSERT INTO studenti (ime, prezime, godina_rođenja, email)
VALUES ('Ivan', 'Horvat', 2001, 'ivan.horvat@example.com');

-- ekvivalen 
INSERT INTO studenti
VALUES ('Ivan', 'Horvat', 2001, 'ivan.horvat@example.com');

-- 1.b. Dodavanje drugog studenta bez e-maila
INSERT INTO studenti (ime, prezime, godina_rođenja)
VALUES ('Ana', 'Kovač', 1999);

-- 1.c. Dodavanje trećeg studenta, bez godine_rođenja (NULL je dozvoljeno jer polje nije NOT NULL)
INSERT INTO studenti (ime, prezime, email)
VALUES ('Marko', 'Perić', 'marko.peric@example.com');

-- 1.d. Pokušaj dodavanja studenta bez prezimena (OVEĆI ĆE IZBACITI GREŠKU jer je prezime NOT NULL)
INSERT INTO studenti (ime, godina_rođenja, email)
VALUES ('Sara', 2002, 'sara.novak@example.com');
-- ❌ ERROR:  null value in column "prezime" violates not-null constraint

-- 1.e. Pokušaj dodavanja studenta s nerealnom godinom_rođenja (OVEĆI ĆE IZBACITI GREŠKU zbog CHECK ograničenja)
INSERT INTO studenti (ime, prezime, godina_rođenja)
VALUES ('Luka', 'Marić', 1800);
-- ❌ ERROR:  new row for relation "studenti" violates check constraint "studenti_godina_rođenja_check"


-- ──────────────────────────────────────────────────────────
-- 2. SELECT upiti nad tablicom 'studenti'
-- ──────────────────────────────────────────────────────────

-- 2.a. Dohvati sve studente
SELECT * FROM studenti;

-- 2.b. Dohvati samo imena i prezimena svih studenata
SELECT ime, prezime FROM studenti;

-- 2.c. Dohvati studente rođene nakon 2000. godine
SELECT * 
FROM studenti 
WHERE godina_rođenja > 2000;

-- 2.d. Dohvati studente čije ime počinje na 'A' (koristi LIKE)
SELECT * 
FROM studenti 
WHERE ime LIKE 'A%';

-- 2.e. Dohvati studente i sortiraj ih po prezimenu uzlazno
SELECT * 
FROM studenti 
ORDER BY prezime ASC;

-- desending


-- ──────────────────────────────────────────────────────────
-- 3. UPDATE upiti nad tablicom 'studenti'
-- ──────────────────────────────────────────────────────────

-- 3.a. Ažuriraj e-mail studenta s id = 2
UPDATE studenti
SET email = 'ana.kovac@studenti.hr'
WHERE id = 2;

-- jako opasno ako nema WHERE uvjeta, promijenit će sve retke
UPDATE studenti
SET email = 'ana.kovac@studenti.hr'

-- 3.b. Promijeni ime i prezime studenta kojem je trenutno ime 'Marko'
UPDATE studenti
SET ime = 'Marin', prezime = 'Perić'
WHERE ime = 'Marko';

-- 3.c. Povećaj godinu_rođenja svakog studenta koji je rođen prije 2000. za 1 godinu (aritmetički izraz)
UPDATE studenti
SET godina_rođenja = godina_rođenja + 1
WHERE godina_rođenja < 2000;


-- ──────────────────────────────────────────────────────────
-- 4. DELETE upiti nad tablicom 'studenti'
-- ──────────────────────────────────────────────────────────

-- 4.a. Obriši studenta s id = 3
DELETE FROM studenti
WHERE id = 3;

-- 4.b. Obriši sve studente rođene prije 1990. godine
DELETE FROM studenti
WHERE godina_rođenja < 1990;


-- ──────────────────────────────────────────────────────────
-- 5. Dodatan primjer: ALTER TABLE i daljnje manipulacije
-- ──────────────────────────────────────────────────────────

-- 5.a. Dodavanje novog stupca 'broj_indexa'
ALTER TABLE studenti
ADD COLUMN broj_indexa VARCHAR(20);

-- 5.b. Ažuriraj broj_indexa svim postojećim studentima
UPDATE studenti
SET broj_indexa = 'SI-2025-' || id::TEXT;

-- 5.c. Dohvati sve studente s novim stupcem
SELECT * FROM studenti;

-- 5.d. Brisanje stupca 'email'
ALTER TABLE studenti
DROP COLUMN email;


-- ──────────────────────────────────────────────────────────
-- Kratki opisni zadatak za studente:
-- 1. Kreirajte tablicu 'studenti' u PostgreSQL pomoću gornje CREATE naredbe.
-- 2. Izvršite INSERT primjere 1.a – 1.e i zabilježite koje su greške dobivene.
-- 3. Pokrenite SELECT upite iz dijela 2 i promatrajte rezultate.
-- 4. Izmijenite neke vrijednosti pomoću UPDATE primjera 3.a – 3.c.
-- 5. Obrišite nekoliko studenata prema uputama iz dijela 4.
-- 6. Dodajte stupac 'broj_indexa', ažurirajte ga i zatim ga izbrišite poput 5.a – 5.d.
-- 7. Dokumentirajte kratko svaki korak i poruke pogrešaka (ako ih bude).
