// all the thing related to app not to the express.
const mongoose = require('mongoose');
const dotenv = require('dotenv');           // import 
dotenv.config({path: "./config.env"});          // take the data from config.env file and put it into the process environment variable.
process.on('uncaughtException',(err)=>{
  console.log(err.message);
  process.exit(1);
})
const app = require('./app');
// const express = require('express');
// const app = express();
port = 4000;

// console.log(app.get('env'));
// to connect with database
mongoose.connect(process.env.CONNECT_DB).then((conn)=>{
   console.log("connection successful!");
  //  console.log(conn);
}) 
 // handle by process object (unhandlederror).
//.catch((err)=>{
 // console.log("some error has occur!");
//})

// schema
// const movieschema = new mongoose.Schema({
//   name: {
//     type: String,           // should be of string data
//     required: [true,"name is required field!"],                 // validator (validate wheather the name field have value or not)
//     unique: true            // name should be unique to store in the database
//   },                            // using schema type option in fields
//   description:String,
//   duration:{
//     type: Number,
//     required: [true,"duration is required field!"]
//   },
//   ratings:{
//     type: Number,
//     default: 1.0
//   }
// });         // optional second argument and talk about in future

// // creating a model
// const Movie = mongoose.model('Movie',movieschema);         // name,schema of the model
// a collection name movies will be created 

// const testmovie = Movie({
//   name:"robin singh",
//   description: "a movie based on the real war around the live of innocent people",
//   duration : 2.3,
 
// })
// testmovie.save()                            // it will return a promise
// .then((doc)=>{
//   console.log(doc);
// }).catch((err)=>{
//   console.log("there is an error"+err);
// });


// console.log(process.env);


const server = app.listen(port,()=>{
    console.log("server is listened.");
  })
  
process.on('unhandledRejection',(err)=>{
  console.log(err.message);
  server.close(()=>{
    process.exit(1);
  })
})
  // we have to run that file where we have created the server 
