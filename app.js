var express = require("express");
const walletRouter = require("./routes/wallet/index");

var app = express();
const port = 3001;

app.use("/wallet", walletRouter);

app.listen(port, () => {
  console.log(`${port}에서 시작!`);
});

module.exports = app;
