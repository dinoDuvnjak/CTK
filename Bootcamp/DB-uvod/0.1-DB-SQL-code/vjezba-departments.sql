-- Kreira tablicu 'departments' za spremanje odjela
CREATE TABLE departments (
    -- id: automatski se numerira i jedinstven je (SERIAL PRIMARY KEY)
    id SERIAL PRIMARY KEY,
    
    -- name: naziv odjela, koristi TEXT radi jednostavne pohrane
    name TEXT NOT NULL,
    
    -- location: lokacija odjela (npr. grad ili zgrada)
    location TEXT
);

-- Kreira tablicu 'employees' s temeljnim podacima o zaposlenicima
CREATE TABLE employees (
    -- id: automatski generirani jedinstveni identifikator (SERIAL PRIMARY KEY)
    id SERIAL PRIMARY KEY,
    
    -- first_name, last_name: imena zaposlenika (TEXT, slobodna duljina)
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    
    -- salary: plaća zaposlenika, koristi DECIMAL za preciznost; CHECK (salary > 0) osigurava pozitivnu vrijednost
    salary DECIMAL(10,2) CHECK (salary > 0),
    
    -- hired_date: datum zaposlenja, koristi DATE tip
    hired_date DATE DEFAULT CURRENT_DATE,
    
    -- department_id: vanjski ključ prema 'departments.id'; jedan zaposlenik može biti bez odjela (NULL)
    department_id INT REFERENCES departments(id)
);

-- Dodavanje prvog odjela u tablicu 'departments'
INSERT INTO departments (name, location)
VALUES ('Ljudski resursi', 'Zagreb');

-- Dodavanje drugog odjela, ali bez lokacije
INSERT INTO departments (name)
VALUES ('IT Podrška');

-- Pokušaj dodavanja trećeg odjela bez imena (OVEĆI ĆE IZBACITI GREŠKU jer je name NOT NULL)
INSERT INTO departments (location)
VALUES ('Split');


-- Dodavanje prvog zaposlenika
INSERT INTO employees (first_name, last_name, salary, department_id)
VALUES ('Ivan', 'Horvat', 5000.00, 1);

-- Dodavanje drugog zaposlenika, bez plaće (OVEĆI ĆE IZBACITI GREŠKU jer je salary NOT NULL i nema zadanu vrijednost)
INSERT INTO employees (first_name, last_name, department_id)
VALUES ('Ana', 'Kovač', 2);

-- Dodavanje trećeg zaposlenika, bez odjela (department_id = NULL je dozvoljeno)
INSERT INTO employees (first_name, last_name, salary)
VALUES ('Marko', 'Perić', 4200.00);

-- Dodavanje četvrtog zaposlenika, bez navedenog datuma zaposlenja (hired_date će se automatski postaviti na današnji datum)
INSERT INTO employees (first_name, last_name, salary, department_id)
VALUES ('Sara', 'Novak', 3800.50, 2);


-- Dohvati sve odjele
SELECT * FROM departments;

-- Dohvati sve zaposlenike
SELECT * FROM employees;

-- Dohvati samo imena i plaće zaposlenika
SELECT first_name, last_name, salary FROM employees;

-- Filtriranje zaposlenika čija je plaća veća od 4000
SELECT * FROM employees WHERE salary > 4000.00;

-- Filtriranje zaposlenika koji su zaposleni nakon 2025-01-01
SELECT * FROM employees WHERE hired_date > '2025-01-01';

-- Ažuriranje plaće jednog zaposlenika
UPDATE employees
SET salary = 5500.00
WHERE id = 1;

-- Ažuriranje više stupaca odjednom (promjena odjela i datum zaposlenja)
UPDATE employees
SET department_id = 1, hired_date = '2025-03-15'
WHERE id = 4;

-- Brisanje zaposlenika prema ID-u
DELETE FROM employees
WHERE id = 3;

-- Brisanje odjela čije ime započinje s 'Osijek'
DELETE FROM departments
WHERE name LIKE 'Osijek%';
