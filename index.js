const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Jimp = require("jimp");
const app = express();

app.listen(3000, () => {
  console.log("Escuchando puerto 3000");
});

app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/imagen", async (req, res) => {
  const { url } = req.query;
  const id = uuidv4().slice(0, 6);
  const nombreArchivo = `${id}.jpeg`;
  const img = await Jimp.read(url);
  await img.resize(350, Jimp.AUTO).greyscale().writeAsync(nombreArchivo);

  res.setHeader("Content-Type", "image/jpeg");
  res.sendFile(__dirname + "/" + nombreArchivo);
});
