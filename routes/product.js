const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const path = require('path');

const url =
  "https://gist.githubusercontent.com/josejbocanegra/c6c2c82a091b880d0f6062b0a90cce88/raw/abb6016942f7db2797846988b039005c6ea62c2f/categories.json";

/**
 * GET ALL
 */
router.get("/", async (req, res) => {
  axios.get(url).then(response => {
    res.render("index", { data: response.data });
  });
  //.catch (...) is not a function
});

/**
 * GET ALL - CALLBACKS
 */
router.get("/api", (req, res) => {
  html_basura(data => {
    res.send(data.toString());
  });
});
//.catch (...) is not a function

html_basura = async renderizar => {
  let products = [];

  await axios.get(url).then(res => {
    products = res.data;
    let archivito = `<!doctype html>
    <html lang="en">
      <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    
        <title>Hello, world!</title>
      </head>
      <body>

        <div class="container"><p>Sebastian Garcia 201630047</p>PlaceHolderXXX</div>
    
        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
      </body>
    </html>`;

    let container = "";

    products.forEach(p => {
      container += `
      <p>
      <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample${p.name}" role="button" aria-expanded="false" aria-controls="collapseExample">
        ${p.name}
      </a>
      <div class="collapse" id="collapseExample${p.name}">
        INFOXXX::${p.name}
      </div>
    </p>`;
    });

    let item_info = '';

    products.forEach(p => {
      p.products.forEach(i => {
        item_info += `
        <div class="card" style="width: 18rem;">
          <img src="${i.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title"> ${i.name}</h5>
            <p class="card-text">${i.description}</p>
            <a href="#" class="btn btn-primary">${i.price} - Add to car</a>
          </div>
        </div>`
      })
      container = container.replace(`INFOXXX::${p.name}`, item_info);
      item_info = '';
    })

    archivito = archivito.replace("PlaceHolderXXX", container);

    fs.writeFile("basura.html", archivito, _ => {
      fs.readFile("basura.html", (error, data ) => {
        renderizar(data);
      });
    });
  });
  //console.log(promise)
};

/**
 * ? Export
 */
module.exports = router;
