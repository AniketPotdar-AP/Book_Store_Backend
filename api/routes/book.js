const express = require("express");
const router = express.Router();
const Book = require("../model/bookModel")
const { body, validationResult } = require("express-validator");

router.post("/createBook", [
    body("name").not().isEmpty(),
    body("title").not().isEmpty(),
    body("price").not().isEmpty(),
    body("category").not().isEmpty(),
    body("image").not().isEmpty()
],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0],
            });
        }

        const BookDetails = {
            name: req.body.name,
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            image: req.body.image,
        };

        const newBook = new Book(BookDetails);
        newBook.save().then((result) => {
            return res.status(200).json({ msg: "Book Created Successfully!!!", details: result });
        }).catch((error) => {
            return res.status(401).json(error);
        });
    }
);

/*=======================================================
                    Get All Book Data
=========================================================*/

router.get("/getBooks", async (req, res) => {
    try {
        const getBook = await Book.find({});
        res.send(getBook);
    } catch (e) {
        res.send(e);
    }
});

/*=======================================================
                    Get Book by ID
=========================================================*/

router.get("/getBook/:id", async (req, res) => {
    try {
        const _id = req.params.id;

        if (!ObjectId.isValid(_id)) {
            return res.status(400).send(`No records with given id : ${_id}`);
        }

        const getBook = await Book.findById({ _id });
        res.status(200).send(getBook);

    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

/*=======================================================
                    Update Book
=========================================================*/

router.put("/updateBook/:id", async (req, res) => {
    try {
        const _id = req.params.id;

        const updateBook = await Book.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(updateBook);
    } catch (e) {
        res.status(500).send(e);
    }
});

/*=======================================================
                    Delete Book
=========================================================*/

router.delete("/deleteBook/:id", async (req, res) => {
    try {
        const deleteBook = await Book.findByIdAndDelete(req.params.id)
        res.send(deleteBook);
    } catch (e) {
        res.send(e);
    }
});


module.exports = router;