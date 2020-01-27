const fs = require("fs");
const express = require("express");
const app = express();
const port = 8080;

console.log("startin dropbox photo frame");

app.use(express.static("fotos"));
app.use(express.static("../build"));
app.get("/fotosList", (req, res) => {
  const files = fs.readdirSync("fotos").filter(file => file !== "ticker.txt");
  res.json(files);
});

app.listen(port, "localhost");
app.on("listening", () =>
  console.log(`Fotos server listening on port ${port}!`)
);
