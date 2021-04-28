const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const eventos = [];

app.post("/eventos", async (req, res) => {
  const evento = req.body;
  eventos.push(evento);
  //envia o evento para o microsservico de clientes
  axios.post("http://localhost:4000/eventos", evento);
  //envia o evento para o microsservico de ingressos
  axios.post("http://localhost:5000/eventos", evento);
  //envia o evento para o microsservico de consulta
  axios.post("http://localhost:6000/eventos", evento);
  //envia o evento para o microsservico de classificacao
  axios.post("http://localhost:7000/eventos", evento);
  res.status(200).send({ msg: "ok" });
});

app.get("/eventos", (req, res) => {
  res.send(eventos);
});

app.listen(10000, () => {
  console.log("Barramento de eventos. Porta 10000.");
});