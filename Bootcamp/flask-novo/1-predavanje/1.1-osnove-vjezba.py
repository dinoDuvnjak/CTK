from flask import Flask, request, jsonify

app = Flask(__name__)

# LEKCIJA 1 – pohrana podataka #################
libraries = [
    {
        "name": "Glavna Biblioteka",
        "books": [
            {
                "title": "Prokleta Avlija",
                "author": "Ivo Andrić"
            }
        ]
    }
]

# LEKCIJA 2 – dohvati sve biblioteke #################
@app.get("/libraries")
def get_libraries():
    return {"libraries": libraries}


# LEKCIJA 3 – kreiraj novu biblioteku #################
@app.post("/library")
def create_library():
    data = request.get_json()  # JSON u body: {"name": "Neka Biblioteka"}
    new_library = {
        "name": data["name"],
        "books": []
    }
    libraries.append(new_library)
    return new_library, 201  # 201 Created


# LEKCIJA 4 – dodaj knjigu u biblioteku #################
@app.post("/library/<string:name>/book")
def create_book_in_library(name):
    data = request.get_json()  # JSON u body: {"title": "...", "author": "..."}
    for lib in libraries:
        if lib["name"] == name:
            new_book = {
                "title": data["title"],
                "author": data["author"]
            }
            lib["books"].append(new_book)
            return new_book, 201
    return {"message": "Biblioteka nije pronađena"}, 404


# LEKCIJA 5 – dohvati sve knjige iz određene biblioteke #################
@app.get("/library/<string:name>")
def get_books_in_library(name):
    for lib in libraries:
        if lib["name"] == name:
            return {"books": lib["books"]}
    return {"message": "Biblioteka nije pronađena"}, 404


# LEKCIJA 6 – pronađi knjigu po naslovu kroz sve biblioteke #################
@app.get("/book/<string:title>")
def find_book(title):
    found = []
    for lib in libraries:
        for book in lib["books"]:
            if book["title"].lower() == title.lower():
                entry = {"library": lib["name"], **book}
                found.append(entry)
    if found:
        return {"results": found}
    return {"message": "Knjiga nije pronađena"}, 404


if __name__ == "__main__":
    app.run(debug=True)
