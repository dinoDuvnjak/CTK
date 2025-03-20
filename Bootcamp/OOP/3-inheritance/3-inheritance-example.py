# Definicija nadklase Device
class Device:
    def __init__(self, name, connected_by):
        self.name = name                    # Ime uređaja
        self.connected_by = connected_by    # Način povezivanja (npr. USB)
        self.connected = True               # Pretpostavlja se da je uređaj spojen

    def __str__(self):
        # Vraća string s informacijama o uređaju; !r poziva repr() za lijepi prikaz imena
        return f"Device: {self.name!r}, {self.connected_by}"

    def disconnect(self):
        self.connected = False              # Postavlja status spojenosti na False
        print("Disconnected")               # Ispis poruke o prekidu spojenosti

# Definicija podklase Printer koja nasljeđuje Device
class Printer(Device):
    def __init__(self, name, connected_by, capacity):
        # Poziva __init__ metodu nadklase Device kako bi se postavili osnovni atributi
        super().__init__(name, connected_by)
        self.capacity = capacity            # Maksimalan broj stranica koje printer može ispisati
        self.remaining_pages = capacity     # Preostale stranice, inicijalno jednako ukupnom kapacitetu

    def __str__(self):
        # Kombinira informacije iz Device klase i dodaje podatak o preostalim stranicama
        return f"{super().__str__()}, remaining pages: {self.remaining_pages}"

    def print_pages(self, pages):
        # Provjerava je li printer spojen prije ispisa
        if not self.connected:
            print("Vaš printer nije spojen")
            return
        print(f"Printing {pages} pages...")
        self.remaining_pages -= pages       # Smanjuje broj preostalih stranica za broj ispisanih stranica

# Primjer korištenja nasljedstva
if __name__ == "__main__":
    # Kreiranje objekta Printer (podklasa Device) s nazivom, načinom povezivanja i kapacitetom od 500 stranica
    device_printer = Printer("Printer", "USB", 500)
    
    # Ispis informacija o printeru (poziva __str__ metodu nadklase i podklase)
    print(device_printer)
    
    # Ispis 20 stranica pomoću metode print_pages
    device_printer.print_pages(20)
    
    # Ispis ažuriranih informacija o printeru (preostale stranice se ažuriraju)
    print(device_printer)
    
    # Isključivanje printera pomoću metode disconnect iz nadklase Device
    device_printer.disconnect()
    
    # Pokušaj ispisa nakon prekida spojenosti (ispisuje upozorenje)
    device_printer.print_pages(30)
