const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const { response } = require("express");

const baseConsulta = {};

const funcoes = {
  ClienteCriado: (cliente) => {
    baseConsulta[cliente.contador] = cliente;
  },
  IngressoComprado: (ingresso) => {
    const ingressos = baseConsulta[ingresso.clienteId]["ingressos"] || [];

    ingressos.push(ingresso);
    baseConsulta[ingresso.clienteId]["ingressos"] = ingressos;
  },
  ClienteAtualizado: (cliente) => {
    const clientes = baseConsulta[cliente]["clientes"];
    const indice = clientes.findIndex((o) => o.id === cliente.id);
    clientes[indice] = cliente;
  },
};

app.get("/clientes", (req, res) => {
  res.status(200).send(baseConsulta);
});

app.post("/eventos", (req, res) => {
  funcoes[req.body.tipo](req.body.dados);
  res.status(200).send(baseConsulta);
});

app.listen(6000, async () => {
  console.log("Consultas. Porta 6000");
  const res = await axios.get("http://localhost:10000.eventos");

  response.data.forEach((valor, indice, colecao) => {
    try {
      funcoes[valor.tipo](valor.dados);
    } catch (err) {}
  });
});
