require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const router = require("./routes");

const PORT = 8081;
const app = express();

// const db = require("./db")

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

/////////////////////////

// // PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

////////////

// app.use("/api/pins", pins(db));
// app.use("/api/users", users(db));

// app.get("/api/users", (req, res) => {
//   const users = [{ username: "Jeremy" }, { username: "Furious" }];
//   res.json(users);
// })

// app.get("/api/users/:user_id", (req, res) => {
//   const user = { username: "Furious" };
//   res.json(user);
// });

app.get("/api/pins", (req, res) => {
  const pins = [{ 3: 3 }, { 4: 4 }];
  res.json(pins);
});

app.get("/api/pins/:pin_id", (req, res) => {
  const pin = { 3: 3 };
  res.json(pin);
});

//database tests!

// app.get("/api/users", async (req, res) => {
//   try {
//     const users = await db.query("SELECT * FROM users;");
//     console.log(res.json(users));
//     const test = res.rows;
//     console.log(test);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

app.get("/api/users/:id", async (req, res) => {
  db.query("SELECT * FROM users;")
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log('API/users error:', err)
      res.status(500).send()
    });
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`♻️ listening on port ${PORT} ♻️`);
});

//fetching information from the database?
module.exports = app;
