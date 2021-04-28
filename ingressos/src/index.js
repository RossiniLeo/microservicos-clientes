const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());
const ingressosPorClienteId = {};
const { v4: uuidv4 } = require("uuid");

app.post("eventos", (req, res) => {
  funcoes[req.body.tipo](req.body.dados);
  res.status(200).send({ msg: "ok" });
});

app.put("/clientes/:id/ingressos", async (req, res) => {
  const idIng = uuidv4();
  const { descricao } = req.body;
  const { quantidade } = req.body;
  //req.params dá acesso à lista de parâmetros da URL
  const ingressosDoCliente = ingressosPorClienteId[req.params.id] || [];
  ingressosDoCliente.push({
    id: idIng,
    descricao,
    quantidade,
  });
  ingressosPorClienteId[req.params.id] = ingressosDoCliente;
  await axios.post("http://localhost:10000/eventos", {
    tipo: "IngressoComprado",
    dados: {
      id: idIng,
      descricao,
      quantidade,
      ClienteId: req.params.id,
    },
  });
  res.status(201).send(ingressosDoCliente);
});

app.get("/clientes/:id/ingressos", (req, res) => {
  res.send(ingressosPorClienteId[req.params.id] || []);
});

app.listen(5000, () => {
  console.log("Ingressos. Porta 5000");
});
