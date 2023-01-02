const express = require('express')
const ActorsModel = require('../models/ActorModel')

const routes = express.Router(); 

routes.get('/all',  (req, res) => {

   ActorsModel.find({}, (err, actor) => {
        if(!err)
            res.json(actor);
        else 
            res.status(510).json({message: err});
   });

});

module.exports = routes