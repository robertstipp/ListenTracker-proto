const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");
const fs = require("fs");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.post("/logClick", (req, res) => {
  console.log("clicked");
  console.log(req.ip);

  const data = {
    time: Date.now(),
    ip: req.ip,
  };

  fs.writeFile(path.join(__dirname, "log.txt"), JSON.stringify(data), () =>
    console.log("success")
  );
  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`Listening on  ${PORT}`);
});
