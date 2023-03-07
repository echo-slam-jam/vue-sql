module.exports = app => {
    const books = require("../controllers/bookcontroller.js");
    var router = require("express").Router();

    router.post("/", books.create);
    router.post("/v2", books.create2)
    router.get("/v2", books.findAll2);
    router.get("/", books.findAll);
    router.get("/search", books.search);
    router.get("/published", books.findAllPublished);
    router.get("/:id", books.findOne);
    router.get("/2/:id", books.findOne2);
    router.put("/:id", books.update);
    router.delete("/:id", books.delete);
    router.delete("/", books.deleteAll);
    app.use('/api/books', router);
};