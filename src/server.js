const express = require("express");
const server = express();

const db = require("./database/db");

//configurar pasta public (use)
server.use(express.static("public"));

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true}))

//utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

//configurar caminhos
server.get("/", (req, res) => {
  return res.render("index.html");
});

server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});

server.post('/savepoint', (req, res) => {
  //req.query: Query strings da nossa URL
  //req.body: corpo do nosso form
  const data = req.body
 // inserir dados no banco de dados
      const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `;
    const values = [data.image, data.name, data.address, data.address2, data.state, data.city, data.items];

    function afterInsertData(err) {
        if (err) {
            return res.send("Erro no Cadastro")
        }
        console.log("cadastrado com  sucesso");
        console.log(this);
      return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {
  const search = req.query.search

  if(search === '') {
    return res.render("search-results.html", { total: 0 });
  }

  //pegar dados do banco de dados
  // LIKE parecido com a palavra pesquisada, = é exatamente
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err);
    }

    const total = rows.length
    //mostrar a pagina html com os dados do banco de dados
    return res.render("search-results.html", {places: rows, total: total});
  });
});

// ligar servidor
server.listen(3000);
