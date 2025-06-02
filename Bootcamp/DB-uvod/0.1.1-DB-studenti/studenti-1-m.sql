-- 1:M relacija između studenata i njihovih domaćih zadaća

-- 1) Kreiramo tablicu STUDENT
CREATE TABLE Student (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL
);

-- 2) Kreiramo tablicu HOMEWORK_SUBMISSION s vanjskim ključem na Student(id)
CREATE TABLE Homework_Submission (
  id SERIAL PRIMARY KEY,
  mark INT CHECK (mark BETWEEN 0 AND 100),
  student_id INT NOT NULL
    REFERENCES Student(id)
    ON DELETE CASCADE
);

-- Primjer INNER JOIN upita za dohvat podataka iz obje tablice:
SELECT
  s.id           AS student_id,
  s.first_name,
  s.last_name,
  h.mark
FROM Student AS s
INNER JOIN Homework_Submission AS h
  ON s.id = h.student_id
ORDER BY s.id;
