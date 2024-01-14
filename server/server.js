const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");
const fs = require("fs");

// fs.writeFile(path.join(__dirname, "log.txt"), "", () =>
//   console.log("Log Reset")
// );

app.use(express.json());

// CLIENT PAGE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/player.html"));
});

// ADMIN PAGE

app.get("/tracker", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/tracker.html"));
});

// SERVE MUSIC

app.get("/music", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/bensound-backtothefuture.mp3"));
});

// LOGGING

app.get("/log", (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, "./log.json"), {
    encoding: "utf8",
  });
  res.status(200).send(data);
});

app.post("/log", (req, res) => {
  const { type } = req.body;
  const data = {
    time: Date.now(),
    ip: req.ip,
    type: type,
  };

  // Read File
  let readData = fs.readFileSync(path.join(__dirname, "./log.json"), {
    encoding: "utf8",
  });
  // Parse File
  readData = JSON.parse(readData);
  // Push new entry
  readData.push(data);
  // Write File
  fs.writeFileSync(path.join(__dirname, "./log.json"), readData);

  // fs.appendFile(path.join(__dirname, "log.json"), JSON.stringify(data), () =>
  //   console.log("Log Added")
  // );

  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`Listening on  ${PORT}`);
});
