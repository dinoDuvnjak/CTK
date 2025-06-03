CREATE TABLE Books (
  id SERIAL PRIMARY KEY,
  naslov VARCHAR(100) NOT NULL,
  autor_glavni VARCHAR(100) NOT NULL,
  godina_izdanja INT 
    CHECK (godina_izdanja BETWEEN 1500 AND EXTRACT(YEAR FROM CURRENT_DATE))
);

CREATE TABLE Authors (
  id SERIAL PRIMARY KEY,
  ime VARCHAR(50) NOT NULL,
  prezime VARCHAR(50) NOT NULL,
  rok_život INT 
    CHECK (rok_život BETWEEN 1000 AND EXTRACT(YEAR FROM CURRENT_DATE))
);

CREATE TABLE Book_Authors (
  book_id   INT NOT NULL REFERENCES Books(id) ON DELETE CASCADE,
  author_id INT NOT NULL REFERENCES Authors(id) ON DELETE CASCADE,
  PRIMARY KEY (book_id, author_id)
);


ALTER TABLE Books
  ADD COLUMN zanr VARCHAR(50) DEFAULT 'Nepoznato';


UPDATE Books
SET naslov = 'Na Drini ćuprija (revidirano izdanje)'
WHERE id = 3;


DELETE FROM Authors
WHERE id = 4;


SELECT id, naslov, autor_glavni, godina_izdanja, zanr
FROM Books
ORDER BY autor_glavni ASC, godina_izdanja DESC;
