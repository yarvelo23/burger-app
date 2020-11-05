// require express
const express = require("express");
// create router
const router = express.Router();
// require burger.js
const burger = require("../models/burger.js");

// get route -> index
router.get("/", function(req, res) {
  burger.selectAll(function (data) {

    var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

// post route -> back to index
router.post("/api/burgers", function(req, res) {
  const burgerName = req.body.burger_name;
  burger.insertOne("burger_name", burgerName, function (result) {
    res.json({id: result.insertId });
  });
});

// put route -> back to index
router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  burger.updateOne(req.params.id, function (result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
