const express = require("express");
const mongoose = require("mongoose");
const directorModel = require("../models/DirectorModel");
const MovieModel = require("../models/MovieModel");

const routes = express.Router();

routes.get("/all", (req, res) => {
  directorModel.find({}, (err, actor) => {
    if (!err) res.json(actor);
    else res.status(510).json({ message: err });
  });
});

routes.get("/names", (req, res) => {
  directorModel.distinct("name", (err, director) => {
    if (!err) res.json(director);
    else res.status(510).json({ message: err });
  });
});

routes.get("/movies", (req, res) => {
  const step1 = { $group: { _id: "$director", nb_film: { $sum: 1 } } };
  const step2 = {
    $project: { _id: 0, acteur: "$_id", nombre_film: "$nb_film" },
  };

  MovieModel.aggregate([step1, step2], (err, directors) => {
    if (!err) res.json(directors);
    else res.status(510).json({ message: err });
  });
});

routes.post("/add", (req, res) => {
  const director = req.body;
  const newActor = new directorModel(director);
  newActor.save((err, actor) => {
    if (!err) res.status(201).json(director);
    else res.sendStatus(507);
  });
});

routes.put("/update/:name", (req, res) => {
  directorModel.findOne({ name: req.params.name }, (err, director) => {
    if (!err && director == null) return res.sendStatus(404);

    directorModel.updateOne(
      { name: req.params.name },
      req.body,
      (err, director) => {
        if (!err) res.status(201).json(director);
        else res.sendStatus(507);
      }
    );
  });
});

routes.delete("/delete/:name", (req, res) => {
  directorModel.findOne({ name: req.params.name }, (err, director) => {
    if (!err && director == null) return res.sendStatus(404);

    directorModel.deleteOne({ name: req.params.name }, (err, director) => {
      if (!err) res.status(201).json(director);
      else res.sendStatus(507);
    });
  });
});

module.exports = routes;