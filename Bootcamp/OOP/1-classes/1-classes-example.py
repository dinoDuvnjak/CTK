
# Ako zelimo izracunati prosjek ocjena studenta, moramo koristiti funkciju average() koja prima listu ocjena studenta i vraca prosjek.
# student = {'name': 'John Doe','age': 25,'grades': [80, 85, 90, 95, 100]}

# def average(sequence):
#     return sum(sequence) / len(sequence)

# print(average(student['grades']))

# Objektno orijentirano programiranje (OOP) je paradigma programiranja koja koristi objekte i klase u programiranju.
# mozemo kreirati klasu Student koja ce sadrzavati metodu average() koja racuna prosjek ocjena studenta.

# class Student:
#     def __init__(self, name, age, grades):
#         self.name = name
#         self.age = age
#         self.grades = grades

#     def __str__(self): # magicna metoda koja se poziva kada se pozove funkcija print() na objektu
#         return f'Name: {self.name}, Age: {self.age}, Grades: {self.grades}'    
    
#     # magicna metoda koja se poziva kada se pozove funkcija repr() na objektu
#     # koristi se za reprezentaciju objekta u obliku stringa, vecinom za debugiranje
#     def __repr__(self): 
#         return f"Student('{self.name}', {self.age}, {self.grades})"

#     def average(self):
#         return sum(self.grades) / len(self.grades)


# student = Student('John Doe', 25, [80, 85, 90, 95, 100])
# print(student)
# print(repr(student))
# print(student.average())





