const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());




// SERVICE CREATE
app.post("/service", async (req, res) => {
  try {
  const response = await axios.post(
    "http://localhost:4001/service/create",
    req.body,
    {
      headers: {
        Authorization: null
      }});
  res.status(response.status).json(response.data);
    }
  catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || {});
  }
})

// SERVICE GET BY ID
app.get("/service/:id", async (req, res) => {
  try {
  const response = await axios.get(
    `http://localhost:4001/service/${req.params.id}`,
    {
      headers: {
        Authorization: null
      }});
  res.status(response.status).json(response.data);
    }
  catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || {});
  }
})

// SERVICE LIST BY FILTERS
app.get("/service", async (req, res) => {
  try {
  const response = await axios.get(
    `http://localhost:4001/service`,
    {
      params: req.query,
      headers: {
        Authorization: null
      }});
  res.status(response.status).json(response.data);
    }
  catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || {});
  }
})

// SERVICE UPDATE BY ID
app.put("/service/:id", async (req, res) => {
  try {
  const response = await axios.put(
  `http://localhost:4001/service/${req.params.id}`,
    req.body,
    {
      headers: {
        Authorization: null
      }});
  res.status(response.status).json(response.data);
    }
  catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || {});
  }
})




app.listen(3001, () => {
  console.log("Gateway 3001");
});