const express = require('express')
const mongoose = require('mongoose')
const directorModel = require('../models/DirectorModel')

const routes = express.Router(); 

routes.get('/all', (req, res) => {

    directorModel.find({}, (err, actor) => {
        if(!err)
            res.json(actor);
        else 
            res.status(510).json({message: err});
   });
})





module.exports = routes