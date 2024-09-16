const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config()

const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.DB_URL)
    .then(
        () => console.log("Database Connected"),
        app.listen(port, () => {
            console.log(`Running on port ${port}`);
        })
    )
    .catch((err) => console.log(err));

const book = require("./api/routes/book");
app.use('/', book)