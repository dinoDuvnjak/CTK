// 4. Funkcija koja vraća filter po ulozi
function getRoleFilter(role) {
    return function (u) {
        return u.role === role;
    };
}
// 6. Funkcija koja filtrira, logira i vraća imena
function reportUsers(users, filter, logger) {
    var matched = users.filter(filter);
    logger("Found ".concat(matched.length, " users with this role."));
    return matched.map(function (u) { return u.name; });
}
// 7. Primjer podataka i test
var usersNew = [
    { name: "Ana", role: "Admin" },
    { name: "Marko", role: "Viewer" },
    { name: "Ivana", role: "Editor" },
    { name: "Petar", role: "Admin" },
    { name: "Marija", role: "Viewer" }
];
var consoleLogger = function (msg) {
    console.log(msg);
};
var adminFilter = getRoleFilter("Admin");
var adminsNew = reportUsers(usersNew, adminFilter, consoleLogger);
console.log("Admins are:", adminsNew);
// Očekivani ispis:
// Found 2 users with this role.
// Admins are: [ 'Ana', 'Petar' ]
