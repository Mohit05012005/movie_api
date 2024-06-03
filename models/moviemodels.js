const mongoose = require('mongoose');
const fs = require('fs');

// schema
const movieschema = new mongoose.Schema({
    name: {
      type: String,           // should be of string data
      required: [true,"name is required field!"],                 // validator (validate wheather the name field have value or not)
      unique: true,            // name should be unique to store in the database
      trim:true   // means that if there is white space then it will remove it.
    },                            // using schema type option in fields
    description:{
      type: String,
      required: [true,"description is required field."]
    },
    duration:{
      type: Number,
      required: [true,"duration is required field!"]
    },
    ratings:{
      type: Number,
      validate: function(value){
        return value>= 1 && value<=10;
      }
    },
    totalRating:{
      type: Number,
      required: [true,"total rating is required."]
    },
    releaseYear:{
      type: Date
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false         // we can do this (excluding the data) from the user (like password).
    },
    genres: {
      type: [String],     // array of string 
      required: [true,"Genres is required field."]
    },
    directors:{
      type: [String],
      required: [true,"directors is required field."]
    },
    coverImage: {
      type: String,
      required: [true,"coverImage is required field."]
    },
    actor: {
      type: [String],
      required: [true,"actor is a required field."]
    },
    price: {
      type: Number
    },
    createdby: String
  },{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  });         // optional second argument and talk about in future - virtual property ko use karne ke liye hamne ye kara hai .
  
  movieschema.virtual('duration_in_hour').get(function(){ // create a virtual property whenever we get the data from the database.
       return this.duration/60;                          // but we have add explicitly.
  })
  // document middleware(moongose)
  movieschema.pre('save',function(next){
    console.log(this);
    this.createdby = 'mohit bohra';
    next();
  });
  // moongose document middleware.
  movieschema.post('save',function(doc,next){         // saved document is doc.
     const content = `the document name is ${doc.name} and it is created by ${doc.createdby}\n`
    fs.writeFileSync('./Log/log.txt',content,{flag: 'a'},(err)=>{
          console.log(err.message);
      })
      next();
  })
  //moongose query middleware.
  movieschema.pre(/^find/,function(next){
    this.find({releaseYear: {$lte: Date.now()}});
    this.startTime = Date.now();
    next();
  })

  movieschema.post(/^find/,function(doc,next){
    this.find({releaseYear: {$lte: Date.now()}});
    this.endTime = Date.now();
    const content = `query took ${this.endTime - this.startTime} milliseconds to fetch the document.\n`     //
    fs.writeFileSync('./Log/log.txt',content,{flag: 'a'},(err)=>{
      console.log(err.message);
  })
    next();
  })
  // creating a model
  const Movie = mongoose.model('Movie',movieschema);         // name,schema of the model (where model is equal to the collection name)
  

  // where we will export or use this ????
  // we will export this where we update,delete,insert and all. 
 module.exports = Movie;