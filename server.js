require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const ActorRoute = require("./routes/actor");
const DirectorRoute = require("./routes/director");
const MovieRoute = require("./routes/movie");

const app = express();
app.use(express.json());

const port = process.env.PORT;
const url = process.env.URL_MONGOOSE;
const dbname = process.env.DBNAME;

mongoose
  .connect(`${url}/${dbname}`, { useNewUrlParser: true })
  .then(() => console.log("connexion reussie"))
  .catch((error) => console.log('Erreur de connexion'));

app.use('/actor', ActorRoute);
app.use('/director', DirectorRoute);
app.use('/movie', MovieRoute);

app.listen(port, (err) => {
  if (!err) console.log("Enable to start server ...");
  else console.log("Server started ...");
});
