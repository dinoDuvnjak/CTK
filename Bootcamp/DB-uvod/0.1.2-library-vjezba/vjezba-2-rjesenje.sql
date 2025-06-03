-- 1;1

-- 1) Kreiranje tablice 'posudba'
CREATE TABLE posudba (
  id SERIAL PRIMARY KEY,
  knjiga_id INT UNIQUE 
    REFERENCES knjige(id) 
    ON DELETE CASCADE,
  ime_posuđivača VARCHAR(100) NOT NULL,
  datum_posudbe DATE    NOT NULL DEFAULT CURRENT_DATE,
  rok_vrata DATE        NOT NULL
);

-- 2) Primjeri ubacivanja u 'posudba'
INSERT INTO posudba (knjiga_id, ime_posuđivača, datum_posudbe, rok_vrata)
VALUES
  (1, 'Ivana Horvat', '2025-05-01', '2025-05-15'),
  (3, 'Marko Marić',  '2025-04-28', '2025-05-12');

-- 3) INNER JOIN: dohvat samo posuđenih knjiga
SELECT
  k.id             AS knjiga_id,
  k.naslov,
  k.autor,
  k.godina_izdanja,
  p.ime_posuđivača,
  p.datum_posudbe,
  p.rok_vrata
FROM knjige AS k
INNER JOIN posudba AS p
  ON k.id = p.knjiga_id
ORDER BY k.id;

-- 4) (Bonus) LEFT JOIN: dohvat svih knjiga + eventualne posudbe
SELECT
  k.id             AS knjiga_id,
  k.naslov,
  k.autor,
  k.godina_izdanja,
  p.ime_posuđivača,
  p.datum_posudbe,
  p.rok_vrata
FROM knjige AS k
LEFT JOIN posudba AS p
  ON k.id = p.knjiga_id
ORDER BY k.id;
