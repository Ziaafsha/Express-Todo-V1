const express = require("express");
const app = express();
const port = 4000;
const router = require("./route")
const db = require("./database");

app.use(express.json());
app.use("/api", router)

app.listen(port, () => console.log(`Server started ${port}`))

