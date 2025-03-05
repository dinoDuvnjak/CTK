# Pokrenite Git u mapi
git init

#  Dodajte sve fajlove u Staging Area
git add .

# preuzimanje najnovijih promjena iz udaljenog (remote) repozitorija, ali bez spajanja
git fetch

# Povratak na prethodnu verziju:
git checkout commit_id

# Prikazuje koji fajlovi su izmjenjeni, dodati ili nisu verzionisani.
git status

#  Zapisuje promene u povijest verzija
git commit -m "Inicijalni commit"

# Kloniranje repozitorijuma sa GitHub-a:
git clone https://github.com/korisnik/projekat.git

# Slanje lokalnih promjena na GitHub:
git push origin main

# Preuzimanje najnovijih promjena:
git pull origin main


# Ignorira sve .log fajlove.
*.log 

# Ignorira sve datoteke unutar tmp/ direktorija.
tmp/* 

# Izuzetak (ne ignorira important.log iako *.log jest).
!important.log 