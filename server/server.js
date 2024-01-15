const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");
const fs = require("fs").promises;

// fs.writeFile(path.join(__dirname, "log.txt"), "", () =>
//   console.log("Log Reset")
// );

app.use(express.json());

// CLIENT PAGE
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/player.html"));
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/styledPlayer.html"));
});

// ADMIN PAGE

app.get("/tracker", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/tracker.html"));
});

// SERVE MUSIC

app.get("/music", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/bensound-backtothefuture.mp3"));
});

app.get("/albumArt", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/album.jpeg"));
});

// LOGGING

app.get("/log", (req, res) => {
  // const data = fs.readFile(path.join(__dirname, "./log.txt"), {
  //   encoding: "utf8",
  // });
  res.sendFile(path.join(__dirname, "./log.txt"));
  // res.status(200).send(data);
});

app.post("/log", async (req, res) => {
  const { type } = req.body;
  const data = {
    time: Date.now(),
    ip: req.ip,
    type: type,
  };

  // Read File
  // let readData = await fs.readFile(path.join(__dirname, "./log.txt"), {
  //   encoding: "utf8",
  // });
  // console.log(readData);
  // Parse File
  // readData = JSON.parse(readData);
  // Push new entry
  // readData.push(data);
  // Write File
  // fs.writeFileSync(path.join(__dirname, "./log.json"), readData);

  fs.appendFile(
    path.join(__dirname, "log.txt"),
    JSON.stringify(data) + "-",
    () => console.log("Log Added")
  );

  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`Listening on  ${PORT}`);
});
