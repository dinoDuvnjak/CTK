// 1. Definicija enum-a
enum Role {
  Admin,
  Editor,
  Viewer
}

// 2. Niz korisnika kao obični objekti
const users: { name: string; role: Role }[] = [
  { name: "Ana",   role: Role.Admin  },
  { name: "Marko", role: Role.Viewer },
  { name: "Ivana", role: Role.Editor },
  { name: "Petar", role: Role.Admin  }
];

// 3. Funkcija koja filtrira samo administratore
function getAdmins(
  users: { name: string; role: Role }[]
): { name: string; role: Role }[] {
  return users.filter(function(u) {
    return u.role === Role.Admin;
  });
}

// 4. Poziv i ispis imena administratora
const admins = getAdmins(users);
for (const admin of admins) {
  console.log(admin.name);
}
// Očekivani ispis:
// Ana
// Petar
