const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// UŽIVATEL / USER (user_service: 4001)
// ==========================================

// USER CREATE
app.post("/user", async (req, res) => {
  try {
  const response = await axios.post(
    "http://localhost:4001/user/create",
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

// USER GET BY ID
app.get("/user/:id", async (req, res) => {
  try {
  const response = await axios.get(
    `http://localhost:4001/user/${req.params.id}`,
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

// USER LIST BY FILTERS
app.get("/user", async (req, res) => {
  try {
  const response = await axios.get(
    `http://localhost:4001/user`,
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

// USER UPDATE BY ID
app.put("/user/:id", async (req, res) => {
  try {
  const response = await axios.put(
  `http://localhost:4001/user/${req.params.id}`,
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


// ==========================================
// SERVISY / SERVICES (user_service: 3001)
// ==========================================

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

// ==========================================
// REZERVACE / RESERVATIONS (reservation_service: 3004)
// ==========================================

// RESERVATION CREATE
app.post("/reservation", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:3004/reservation/create", 
      req.body,
      {
      headers: {
        Authorization: null
      }}
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: "Chyba komunikace s reservation_service" });
  }
});

// RESERVATION GET BY ID
app.get("/reservation/:id", async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:3004/reservation/${req.params.id}`,
      {
      headers: {
        Authorization: null
      }}
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: "Chyba komunikace s reservation_service" });
  }
});

// RESERVATION GET LIST BY FILTERS
app.get("/reservation", async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:3004/reservation`,
      {
      params: req.query,
      headers: {
        Authorization: null
      }}
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: "Chyba komunikace s reservation_service" });
  }
});

// RESERVATION UPDATE BY ID
app.put("/reservation/:id", async (req, res) => {
  try {
    const response = await axios.put(`http://localhost:3004/reservation/${req.params.id}`, 
      req.body,
      {
      headers: {
        Authorization: null
      }}
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: "Chyba komunikace s reservation_service" });
  }
});

// RESERVATION DELETE BY ID
app.delete("/reservation/:id", async (req, res) => {
  try {
    const response = await axios.delete(`http://localhost:3004/reservation/${req.params.id}`,
      {
      headers: {
        Authorization: null
      }}
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: "Chyba komunikace s reservation_service" });
  }
});



app.listen(3001, () => {
  console.log("Gateway 3001");
});