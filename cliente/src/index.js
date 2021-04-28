const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const nodemon = require("nodemon");
const clientes = {};
contador = 0;
app.get("/clientes", (req, res) => {
  res.send(clientes);
});

app.put("/clientes", async (req, res) => {
  contador++;
  const { nome } = req.body;
  const { endereco } = req.body;
  const { idade } = req.body;
  clientes[contador] = {
    nome,
    endereco,
    idade,
    status: "aguardando",
  };
  await axios.post("http://localhost:10000/eventos", {
    tipo: "ClienteCriado",
    dados: {
      contador,
      nome,
      endereco,
      idade,
      status: "aguardando",
    },
  });
  res.status(201).send(clientes[contador]);
});
