const express = require("express");
const router = express.Router();
const axios = require("axios");

const url =
  "https://gist.githubusercontent.com/josejbocanegra/c6c2c82a091b880d0f6062b0a90cce88/raw/abb6016942f7db2797846988b039005c6ea62c2f/categories.json";

/**
 * GET ALL
 */
router.get("/", async (req, res) => {
  axios
    .get(url)
    .then(response => {
      res.render("index", { data: response.data });
    })
    //.catch (...) is not a function
});

/**
 * ? Export
 */
module.exports = router;
