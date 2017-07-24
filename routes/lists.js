"use strict";

const express = require("express");
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    db.viewTable("lists")
      .then((results) => {
        res.json(results);
      });
  });

  // get favourite lists


  // get your lists


  // get contributions


  router.get("/:id", (req, res) => {
    db.findInTable("items", "list_id", req.params.id)
      .then((results) => {
        res.json(results);
      });
  });

  router.post("/new", (req, res) => {
    const newList = {
      id: db.generateRandomString(),
      name: req.body.name,
      creator_id: req.session.userId
    };
    db.addToTable("lists", newList);
  });

  return router;
};
