const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
db.connect();

//Select all pins
router.get("/api/pins", (req, res) => {
  db.query("SELECT * FROM pins;")
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log("API/pins error:", err);
      res.status(500).send();
    });
});

//Select individual pins

router.get("/api/pins/:id", (req, res) => {
  db.query("SELECT * FROM pins WHERE id=$1;", [req.params.id])
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log("API/pins error:", err);
      res.status(500).send();
    });
});

//Delete individual pins

router.delete("/api/pins/:id", (req, res) => {
  db.query("DELETE FROM pins WHERE id = $1 RETURNING *;", [req.params.id])
    .then((response) => {
      res.send(200)
    })
    .catch((err) => {
      console.log("API/pins error:", err);
      res.status(500).send();
    });
})

//Update individual pins

router.put("/api/pins/:id", async (req, res) => {

  try {

    const { userID, pinID } = req.body;
    await db.query(
      "UPDATE pins SET claimer_id = $1 WHERE id = $2 RETURNING *;", [userID, pinID]
    ).then((response) => {

      res.json(response.rows);
    });
  } catch (err) {
    console.error(err.message);
  }

});

//create a new pin

router.post("/api/pins", async (req, res) => {

  try {
    //test compare with users
    const verification = jwt.verify(req.headers.token, process.env.TOKEN_KEY);
    const {
      title,
      description,
      picture,
      condition,
      latitude,
      longitude,
      date,
      creator_id,
      claimer_id,
    } = req.body;

    const newPin = await db.query(
      "INSERT INTO pins (title, description, picture, condition, latitude, longitude, date, creator_id, claimer_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        title,
        description,
        picture,
        condition,
        latitude,
        longitude,
        date,
        creator_id,
        claimer_id,
      ]
    );
    res.json(newPin);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router