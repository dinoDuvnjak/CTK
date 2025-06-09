import uuid
from flask import Flask, request, jsonify

from db import libraries

app = Flask(__name__)

libraries = {
    # Pre-populate with one library entry
    # "<uuid>": {"id": "<uuid>", "name": "Glavna Biblioteka", "books": [{"id": "<uuid>", "title": "Prokleta Avlija", "author": "Ivo Andrić"}]}
}

# Helper functions
def find_library(lib_id):
    return libraries.get(lib_id)

def find_book(lib, book_id):
    return next((b for b in lib["books"] if b["id"] == book_id), None)

# Endpoints

@app.get("/libraries")
def get_libraries():
    return jsonify({"libraries": list(libraries.values())})

@app.post("/library")
def create_library():
    data = request.get_json()
    lib_id = uuid.uuid4().hex
    new_lib = {"id": lib_id, "name": data["name"], "books": []}
    libraries[lib_id] = new_lib
    return jsonify(new_lib), 201

@app.get("/library/<string:library_id>")
def get_books_in_library(library_id):
    lib = find_library(library_id)
    if not lib:
        return jsonify({"message": "Biblioteka nije pronađena"}), 404
    return jsonify({"books": lib["books"]})

@app.post("/library/<string:library_id>/book")
def create_book_in_library(library_id):
    lib = find_library(library_id)
    if not lib:
        return jsonify({"message": "Biblioteka nije pronađena"}), 404
    data = request.get_json()
    book_id = uuid.uuid4().hex
    new_book = {"id": book_id, "title": data["title"], "author": data["author"]}
    lib["books"].append(new_book)
    return jsonify(new_book), 201

@app.get("/book/<string:book_id>")
def get_book(book_id):
    for lib in libraries.values():
        book = find_book(lib, book_id)
        if book:
            return jsonify({"library_id": lib["id"], **book})
    return jsonify({"message": "Knjiga nije pronađena"}), 404

@app.get("/books")
def search_books():
    title = request.args.get("title")
    results = []
    for lib in libraries.values():
        for book in lib["books"]:
            if not title or book["title"].lower() == title.lower():
                results.append({"library_id": lib["id"], **book})
    if title and not results:
        return jsonify({"message": "Knjiga nije pronađena"}), 404
    return jsonify({"results": results})

if __name__ == "__main__":
    app.run(debug=True)
