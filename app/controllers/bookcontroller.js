const Book = require("../models/bookmodel.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const book = new Book({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false,
    });
    Book.create(book, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error occurred"
            });
        } else {
            res.send(data);
        }
    })
};
exports.findAll = (req, res) => {
    const title = req.query.title;
    Book.getall(title, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error while retrieving"
            });
        } else {
            res.send(data);
        }
    })
};
exports.findOne = (req, res) => {
    
};
exports.findAllPublished = (req, res) => {
    
};
exports.update = (req, res) => {
    
};
exports.delete = (req, res) => {
    
};
exports.deleteAll = (req, res) => {
    
};