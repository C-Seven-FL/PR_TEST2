const express = require("express");

const app = express();

app.post("/three", (req, res) => {
  console.log("feature service is ON");
  res.send("feature service");
});

app.listen(4003, () => {
  console.log("feature service port 4003");
});