// 1. Definicija enum tipa
enum Role {
  Admin,
  Editor,
  Viewer
}

// 2. Klasa User
class User {
  constructor(
    public name: string,
    public role: Role
  ) {}
}

// 3. Kreiranje korisnika
const users: User[] = [
  new User("Ana", Role.Admin),
  new User("Marko", Role.Editor),
  new User("Ivana", Role.Viewer),
  new User("Petar", Role.Admin)
];

// 4. Funkcija koja vraća samo administratore
function getAdmins(users: User[]): User[] {
  const admins: User[] = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].role === Role.Admin) {
      admins.push(users[i]);
    }
  }
  return admins;
}

// 5. Ispis rezultata
const admins = getAdmins(users);
for (let i = 0; i < admins.length; i++) {
  console.log("Admin:", admins[i].name);
}
// Očekivani ispis:
// Admin: Ana
// Admin: Petar
