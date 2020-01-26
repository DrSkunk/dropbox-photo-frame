const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(cors());
app.use(express.static("fotos"));
app.get("/", (req, res) => {
  const files = fs.readdirSync("fotos").filter(file => file !== "ticker.txt");
  res.json(files);
});

app.listen(port, () => console.log(`Fotos server listening on port ${port}!`));
