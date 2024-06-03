// // hame json file ko import karna hai through mongodb
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config({path:'./config.env'}); // it will export the envirnment variable into the process.env method or file from config.env.
// const app = require('./app');  // express() object importing from the app.js file.
// const fs = require('fs');
// const Movie = require('./models/moviemodels');



// // to connect with mongodb
// mongoose.connect(process.env.CONNECT_DB).then((conn)=>{
//     console.log("connection successful!");
//  }).catch((err)=>{
//    console.log("some error has occur!");
//  })

//  const movies = json.parse(fs.readFileSync('./data/movies.json','utf-8'));          // json.parse is used to convert json file to javascript object.
//  Movie.
