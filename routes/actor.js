const express = require("express");
const ActorsModel = require("../models/ActorModel");
const MovieModel = require("../models/MovieModel");

const routes = express.Router();

routes.get("/all", (req, res) => {
  ActorsModel.find({}, (err, actor) => {
    if (!err) res.json(actor);
    else res.status(510).json({ message: err });
  });
});

routes.get("/names", (req, res) => {
  ActorsModel.distinct("name", (err, actor) => {
    if (!err) res.json(actor);
    else res.status(510).json({ message: err });
  });
});

routes.get("/movies", (req, res) => {
  const step1 = { $unwind: "$actors" };
  const step2 = { $group: { _id: "$actors", nb_film: { $sum: 1 } } };
  const step3 = {
    $project: { _id: 0, acteur: "$_id", nombre_film: "$nb_film" },
  };

  MovieModel.aggregate([step1, step2, step3], (err, actors) => {
    if (!err) res.json(actors);
    else res.status(510).json({ message: err });
  });
});

routes.post("/add", (req, res) => {
  const actor = req.body;
  const newActor = new ActorsModel(actor);
  newActor.save((err, actor) => {
    if (!err) res.status(201).json(actor);
    else res.sendStatus(507);
  });
});

routes.put("/update/:name", (req, res) => {

  ActorsModel.findOne({ name: req.params.name }, (err, actor) => {
    if (!err && actor == null) return res.sendStatus(404);

    ActorsModel.updateOne({ name: req.params.name }, req.body, (err, actor) => {
      if (!err) res.status(201).json(actor);
      else res.sendStatus(507);
    });
  });

});

routes.delete("/delete/:name", (req, res) => {

    ActorsModel.findOne({ name: req.params.name }, (err, actor) => {
        if (!err && actor == null) return res.sendStatus(404);
    
        ActorsModel.deleteOne({ name: req.params.name }, (err, actor) => {
          if (!err) res.status(201).json(actor);
          else res.sendStatus(507);
        });
      });
      
});

module.exports = routes;
