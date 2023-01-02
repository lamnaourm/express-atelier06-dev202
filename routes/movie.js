const express = require('express')
const mongoose = require('mongoose')
const MovieModel = require('../models/MovieModel')

const routes = express.Router(); 

routes.get('/all', (req, res) => {

    MovieModel.find({}, (err, actor) => {
        if(!err)
            res.json(actor);
        else 
            res.status(510).json({message: err});
   });

})

module.exports = routes