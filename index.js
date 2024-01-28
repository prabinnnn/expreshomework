const express = require("express");
const app = express();
const indexofrouter = require("./routes");
app.use(express.json());
app.use("/", indexofrouter);
app.use((req, res, err, next) => {
  const errmsage = err ? err.toString() : "something missing";
  res.status(500).json({ msg: errmsage });
});
app.listen(8000, () => {
  console.log("app is running");
});
