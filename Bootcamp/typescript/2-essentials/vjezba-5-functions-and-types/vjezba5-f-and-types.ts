// 1. Literalni tip za uloge
type UserRole = "Admin" | "Editor" | "Viewer";

// 2. Type alias za korisnika
type User = {
  name: string;
  role: UserRole;
};

// 3. Type alias za filter funkciju
type UserFilter = (user: User) => boolean;

// 4. Funkcija koja vraća filter po ulozi
function getRoleFilter(role: UserRole): UserFilter {
  return function(u: User): boolean {
    return u.role === role;
  };
}

// 5. Type alias za logger
type Logger = (msg: string) => void;

// 6. Funkcija koja filtrira, logira i vraća imena
function reportUsers(
  users: User[],
  filter: UserFilter,
  logger: Logger
): string[] {
  const matched = users.filter(filter);
  logger(`Found ${matched.length} users with this role.`);
  return matched.map(u => u.name);
}

// 7. Primjer podataka i test
const usersNew: User[] = [
  { name: "Ana",   role: "Admin"  },
  { name: "Marko", role: "Viewer" },
  { name: "Ivana", role: "Editor" },
  { name: "Petar", role: "Admin"  },
  { name: "Marija", role: "Viewer" }
];

const consoleLogger: Logger = function(msg: string): void {
  console.log(msg);
};

const adminFilter = getRoleFilter("Admin");
const adminsNew = reportUsers(usersNew, adminFilter, consoleLogger);

console.log("Admins are:", adminsNew);
// Očekivani ispis:
// Found 2 users with this role.
// Admins are: [ 'Ana', 'Petar' ]
