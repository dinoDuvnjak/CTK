// 1. Definicija sučelja
interface Student {
  firstName: string;
  lastName: string;
  grade: number;
  isActive: boolean;
}

// 2. Filtriranje aktivnih studenata
function getActiveStudents(students: Student[]): Student[] {
  return students.filter(function(s) {
    return s.isActive;
  });
}

// 3. Račun prosječne ocjene aktivnih studenata
function calculateAverageGrade(students: Student[]): number {
  const active = getActiveStudents(students);
  if (active.length === 0) {
    return 0; // ili bacite grešku, ovisno o željenom ponašanju
  }
  const sum = active.reduce(function(acc, s) {
    return acc + s.grade;
  }, 0);
  return sum / active.length;
}

// 4. Primjer upotrebe
const students: Student[] = [
  { firstName: "Ana",  lastName: "Horvat", grade: 5, isActive: true  },
  { firstName: "Marko",lastName: "Marić",  grade: 3, isActive: false },
  { firstName: "Ivana",lastName: "Kovač",  grade: 4, isActive: true  },
  { firstName: "Petar",lastName: "Babić",  grade: 2, isActive: true  },
];

const activeStudents = getActiveStudents(students);
console.log("Aktivni studenti:", activeStudents);
/*
  Aktivni studenti: [
    { firstName: "Ana", lastName: "Horvat", grade: 5, isActive: true },
    { firstName: "Ivana", lastName: "Kovač", grade: 4, isActive: true },
    { firstName: "Petar", lastName: "Babić", grade: 2, isActive: true }
  ]
*/

const avgGrade = calculateAverageGrade(students);
console.log("Prosječna ocjena aktivnih:", avgGrade);  // → (5 + 4 + 2) / 3 = 3.666...
