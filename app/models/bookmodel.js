const sql = require("./db.js"); // uses the exported "connection" module

const Book = function(book) { //creates object
    this.title = book.title;
    this.description = book.description;
    this.published = book.published;
};

Book.create = (newBook, result) => {
    sql.query("INSERT INTO books SET ?", newBook, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created book: ", { id:res.insertId, ...newBook });
        result(null, { id: res.insertId, ...newBook });
    });
};

Book.findById = (id, result) => {
    sql.query(`SELECT * FROM books WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found books: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    })
};

Book.getall = (title, result) => {
    let query = "SELECT * FROM books";
    if (title) {
        query += `WHERE title LIKE '%${title}%'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("books: ", res);
        result(null, res);
    });
};

Book.getAllPublished = result => {
    sql.query("SELECT * FROM books WHERE published=true", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("books: ", res);
        result(null, res);
    });
};

Book.updateById = (id, book, result) => {
    sql.query(
        "UPDATE books SET title = ?, description = ?, published = ? WHERE id = ?",
        [tutorial.title, tutorial.descrition, tutorial.published, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated tutorial: ", { id: id, ...tutorial });
            result(null, { id: id, ...tutorial });
        }
    );
};

Book.remove = (id, result) => {
    sql.query("DELETE FROM books WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted book with id: ", id);
    });
};

Book.removeAll = result => {
    sql.query("DELETE FROM books", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} books`);
        result(null, res);
    });
};

module.exports = Book;
