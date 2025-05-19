// 1. Filtriranje aktivnih studenata (tip studenta je inline)
function getActiveStudents(
  students: {
    firstName: string;
    lastName: string;
    grade: number;
    isActive: boolean;
  }[]
): {
  firstName: string;
  lastName: string;
  grade: number;
  isActive: boolean;
}[] {
  return students.filter(function (s) {
    return s.isActive;
  });
}

// 2. Račun prosječne ocjene aktivnih studenata
function calculateAverageGrade(
  students: {
    firstName: string;
    lastName: string;
    grade: number;
    isActive: boolean;
  }[]
): number {
  const active = getActiveStudents(students);
  if (active.length === 0) {
    return 0; // ili throw new Error("Nema aktivnih studenata");
  }
  const sum = active.reduce(function (acc, s) {
    return acc + s.grade;
  }, 0);

  // let sum = 0;
  // active.forEach(s => {
  //   sum += s.grade;
  // });
  return sum / active.length;
}

// 3. Primjer podataka (tip niza je inline)
const students: {
  firstName: string;
  lastName: string;
  grade: number;
  isActive: boolean;
}[] = [
  { firstName: "Ana",   lastName: "Horvat", grade: 5, isActive: true  },
  { firstName: "Marko", lastName: "Marić",  grade: 3, isActive: false },
  { firstName: "Ivana", lastName: "Kovač",  grade: 4, isActive: true  },
  { firstName: "Petar", lastName: "Babić",  grade: 2, isActive: true  },
];

// 4. Korištenje funkcija
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
console.log("Prosječna ocjena aktivnih:", avgGrade);
// Ispis: Prosječna ocjena aktivnih:  (5 + 4 + 2) / 3 = 3.6666666666666665
