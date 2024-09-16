const express = require("express");
const router = express.Router();
const Book = require("../model/bookModel")

router.get("/getBooks", async (req, res) => {
    try {
        const getBooks = await Book.find();
        res.status(200).json(getBooks)
    } catch (error) {
        res.status(500).json(error)
    }
});


module.exports = router;