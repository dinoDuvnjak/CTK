// 1. Definicija enum-a
var Role;
(function (Role) {
    Role[Role["Admin"] = 0] = "Admin";
    Role[Role["Editor"] = 1] = "Editor";
    Role[Role["Viewer"] = 2] = "Viewer";
})(Role || (Role = {}));
// 2. Niz korisnika kao obični objekti
var users = [
    { name: "Ana", role: Role.Admin },
    { name: "Marko", role: Role.Viewer },
    { name: "Ivana", role: Role.Editor },
    { name: "Petar", role: Role.Admin }
];
// 3. Funkcija koja filtrira samo administratore
function getAdmins(users) {
    return users.filter(function (u) {
        return u.role === Role.Admin;
    });
}
// 4. Poziv i ispis imena administratora
var admins = getAdmins(users);
for (var _i = 0, admins_1 = admins; _i < admins_1.length; _i++) {
    var admin = admins_1[_i];
    console.log(admin.name);
}
// Očekivani ispis:
// Ana
// Petar
