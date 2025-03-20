# Bazna klasa Device koja definira osnovne metode za elektroničke uređaje
class Device:
    def __init__(self, name):
        self.name = name         # Ime uređaja
        self.is_on = False       # Status uređaja, inicijalno isključen

    def turn_on(self):
        # Apstraktna metoda - podklase trebaju implementirati vlastitu verziju
        raise NotImplementedError("Metoda 'turn_on' mora biti implementirana u podklasama")

    def turn_off(self):
        # Apstraktna metoda - podklase trebaju implementirati vlastitu verziju
        raise NotImplementedError("Metoda 'turn_off' mora biti implementirana u podklasama")

    def __str__(self):
        status = "uključen" if self.is_on else "isključen"
        return f"{self.__class__.__name__} '{self.name}' je {status}"


# Podklasa Phone koja nasljeđuje Device i implementira specifične metode
class Phone(Device):
    def turn_on(self):
        self.is_on = True
        return f"Telefon '{self.name}' se uključio."

    def turn_off(self):
        self.is_on = False
        return f"Telefon '{self.name}' se isključio."

    def make_call(self, number):
        if self.is_on:
            return f"Telefon '{self.name}' zove broj {number}."
        else:
            return f"Telefon '{self.name}' je isključen, ne može obaviti poziv."


# Podklasa TV koja nasljeđuje Device i implementira specifične metode
class TV(Device):
    def turn_on(self):
        self.is_on = True
        return f"Televizor '{self.name}' se uključio."

    def turn_off(self):
        self.is_on = False
        return f"Televizor '{self.name}' se isključio."

    def change_channel(self, channel):
        if self.is_on:
            return f"Televizor '{self.name}' prebacuje na kanal {channel}."
        else:
            return f"Televizor '{self.name}' je isključen, ne može promijeniti kanal."


# Klasa Home koja koristi kompoziciju i sadrži listu uređaja
class Home:
    def __init__(self, address):
        self.address = address
        self.devices = []   # Lista uređaja u kući

    def add_device(self, device):
        # Provjera je li uređaj instanca klase Device
        if isinstance(device, Device):
            self.devices.append(device)
        else:
            print("Samo objekti tipa Device mogu se dodati.")

    def show_devices(self):
        print(f"Kuća na adresi {self.address} sadrži sljedeće uređaje:")
        for device in self.devices:
            print(f"- {device}")


# Funkcija koja demonstrira polimorfizam: prima listu uređaja i poziva njihove metode
def operate_devices(devices):
    for device in devices:
        # Uključivanje i isključivanje uređaja pomoću specifičnih implementacija podklasa
        print(device.turn_on())
        print(device.turn_off())
        print()


# Glavni dio programa
if __name__ == "__main__":
    # Kreiranje instanci uređaja
    my_phone = Phone("iPhone 12")
    my_tv = TV("Samsung QLED")

    # Demonstracija dodatnih metoda specifičnih za uređaje
    print(my_phone.turn_on())
    print(my_phone.make_call("0123456789"))
    print(my_tv.turn_on())
    print(my_tv.change_channel(5))
    print()

    # Kreiranje kuće i dodavanje uređaja koristeći kompoziciju
    my_home = Home("Ulica Primjera 123")
    my_home.add_device(my_phone)
    my_home.add_device(my_tv)

    # Prikaz svih uređaja u kući
    my_home.show_devices()
    print()

    # Demonstracija polimorfizma preko funkcije operate_devices
    print("Demonstracija polimorfizma:")
    operate_devices([my_phone, my_tv])
