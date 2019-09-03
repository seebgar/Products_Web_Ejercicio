const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");

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
    res.send(data)
  })
})
  //.catch (...) is not a function

  html_basura = async (renderizar) => {
    let products = []
    axios.get(url).then(res => {
      products = res.data;
    })
    let html =
      '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"><script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script><script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>';
      Array.from(products).forEach(p => {
        html += `<p>
      <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample${p.products[0].name}" role="button" aria-expanded="false" aria-controls="collapseExample">
        ${p.name}
      </a>
      <div class="collapse" id="collapseExample${p.products[0].name}">
        <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"> ${p.products[0].name}</h5>
          <p class="card-text">${p.products[0].description}</p>
          <a href="#" class="btn btn-primary">${p.products[0].price}</a>
        </div>
      </div>
      </div>
    </p>`;
    });

    fs.writeFile("basura.html", html, _ => {
      fs.readFile("basura.html", data => {
        renderizar(data);
      });
    });
  };


/**
 * ? Export
 */
module.exports = router;
