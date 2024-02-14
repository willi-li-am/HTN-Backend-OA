import express from "express";
import createUserTable from "./models/user.js";

const port = process.env.PORT || 3000;

const app = express();

//Initialize Tables
createUserTable()
  .then((res) => console.log(res))
  .catch((err) => console.log(err))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example REST Express app listening at http://localhost:${port}`);
});
