import express from "express";
import createUserTable from "./models/user.js";
import createSkillFrequencyTable from "./models/skills.js";

import userRoute from "./routes/users.js"
import skillRoute from "./routes/skills.js"

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json())

//Initialize Tables
createUserTable()
  .then((res) => console.log(res))
  .catch((err) => console.log(err))

createSkillFrequencyTable()
  .then((res) => console.log(res))
  .catch((err) => console.log(err))

app.use(express.urlencoded({ extended: true }))

app.use('/users', userRoute)
app.use('/skills', skillRoute)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example REST Express app listening at http://localhost:${port}`);
});


