// const fs = require('fs');
// let data = JSON.parse(fs.readFileSync('./data/movies.json'));      // change into javascript object
// const { query } = require('express');
const apifeatures = require('./../utils/apifeature');
const Movie = require('./../models/moviemodels');
const asyncErrorHandler = require('./../utils/asynchandler');
const customError = require('./../utils/customerror');
// param middleware use

// exports.checkid = (req,resp,next,value) =>{
//  console.log("id is "+ value);

//  const real_id = req.params.id *1;
//  let movie = data.find(el => el.id === real_id);
//     if(!movie){
//       return resp.status(404).json({
//          status: "fail",
//          movie: "not found this movie"
//        })
//      }
//      next();
// }

// exports.checkupdate = (req,resp,next)=>{
//   if(!req.body.name || !req.body.year || !req.body.actor){
//   return  resp.status(400).json({
//       status: "fail",
//       messege: "not a movie"
//     })
//   }
//   next();
// }
exports.highrated = (req,resp,next)=>{
  req.query.limit = "5";        // adding two property to the query string. 1)
  req.query.sort = -ratings;     // 2)
  next();
}

exports.newmovies = asyncErrorHandler(async(req,resp)=>{    
// as we know that Movie.find() method is used to return a query object in which we can perform mongoose method like 
     const features = new apifeatures(Movie.find(),req.query).sort().filter().field().pagination();
    // console.log(req.query);
    // const exclude = ['sort','page','limit','fields'];
    // const objquery = {...req.query};      // shellow copy
    // exclude.forEach((el)=>{
    //   delete objquery[el]
    // })
    // // console.log(objquery);
    // const data = await Movie.find(objquery);
    // .where('duration').equals(req.query.duration)
    // .where('ratings').equals(req.query.ratings);    // not using this in proper way
          //  in req.query have will get the object which contain all the query which we will give.

    // for advance filtering 
    // Movie.find({duration:{$gte: 145},ratings:{$gte: 4.5},price:{$lte: 100}});


    // this method is transfer in  apifeature.js file
  //   let querystr = JSON.stringify(req.query);
  //  querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`);
  //  const queryobj = JSON.parse(querystr);
     //here finish.

  //  console.log(real_obj_query);
   // or using .where.equals method of mongoose.

  //  const data = await Movie.find(objquery)
  //   .where('duration').gte(req.query.duration)
  //   .where('ratings').gte(req.query.ratings)
  //   .where('price').lte(req.query.price);

  //  console.log(real_obj_query);
   // for advance query
  // let queryp = Movie.find(queryobj);         // it will give doc from collection if we put an await on it.     // remove the await keyword because if we will add then it will not give anything or error.
   // give query 

   //(sorting logic)
  // if(req.query.sort){
  //     queryp = queryp.sort(req.query.sort);        
  //  }

  //  else{                // ye pta nahi
  //   queryp.sort("-created at");
  //  }
   // field limiting
    // if(req.query.fields){
    // //  Movie.select("name duration price rating");

    // const fields = req.query.fields.split(',').join(' ');
    //   queryp = queryp.select(fields);

    // }
    // else{
    //  queryp =  queryp.select("-__v");
    // }
      // query pagination
      // const page = req.query.page;
      // const limit = req.query.limit;
      // const skip = (page-1)*10;
      // queryp = queryp.skip(skip).limit(limit);
      
      // if(req.query.page){
      //   const countmovie = await Movie.countDocuments();
      //   if(countmovie >= skip){
      //     throw new Error("the page is not found!");
      //   }
      // }

    const moviess = await features.query;   // if we use await key word it will give document or result and not query object there for method of query obect will not work like
          // like sort,split,findOne,etc. of mongoose.// and without await it will give query object.

    resp.status(200).json({
      status: "success",
      length: moviess.length,
      moviess

    });
  }
)
    








  // route handler(call back function)
    // resp.status(200).json(                // json file in json json format because as we know that we are making rest full api which follow rest architecture.
    //   {
    //     requst_date: req.request_date_at,
    //     status:"success",
    //     count:data.length,
    //     reald: data
    //   }
    // );              // before sending the json data we have to format the data like (json json formating )
  // get request.
  

  exports.onemovie = asyncErrorHandler(async(req,resp,next)=>{
      const id = req.params.id;
      // const mov =  await Movie.find({_id : id});
      const mov = await Movie.findById(id);
      if(!mov){
        const error = new customError('document of that id is not found',404);
       return next(error);   // if not return then one more status will be sented.
      }
      resp.status(200).json({
        status: "success",
        mov             // java script is intelligent to get the key and the value as if the key and value have the same name.
      })
    }
     
  )


  //   // console.log(req.params);      // object which hold the route parameters
    
  //   // jo id hai na usi id ka object return karna hai respond me.
  //    const real_id = req.params.id *1;
  //  let movie = data.find(el => el.id === real_id);
  
  //     // if(!movie){
  //     //  return resp.status(404).json({
  //     //     status: "fail",
  //     //     movie: "not found this movie"
  //     //   })
  //     // }
  
  
  //  resp.status(200).json({
  //   status: "success",
  //   data: {
  //     movie: movie
  //   }
  //  })

  


  exports.updatemovie = asyncErrorHandler(async(req,resp)=>{
    // 1 method
    //  const testmovie = Movie(req.body);
    //  testmovie.save().then((op)=>{
    //   resp.status(201).json({
    //     status: "success",
    //     movie:op
    //   })
    //  }).catch((err)=>{
    //   resp.status(400).json({
    //     status:"fail",
    //     message:err.message
    //   })
    //  })
        const testmovie  =  await Movie.create(req.body);   // where Movie is a model and create is the method and it will return a promise.
         
        resp.status(201).json({
          status:"success",
          movie: testmovie
        })
    // console.log(req.body);
  //  let id = data.length + 1 ;
  //  let movie = Object.assign({ id: id},req.body);      // to merge two object into a new object
  //  console.log(movie);
  //  data.push(movie);
  //  fs.writeFile('./data/movies.json',JSON.stringify(data),(err)=>{
  //       resp.status(201).json({
  //         status: "success",
  //         count: data.length,
  //         movies: {
  //           moviess: movie
  //         }
  //       })
  //  });
  // patch method
    // resp.send("data is sent");
  })
 
  
  
  exports.twoupdate = asyncErrorHandler(async(req,resp,next)=>{

  const id  = req.params.id;
  // Movie.updateOne({_id: id},{$set: {}})

    const update = await Movie.findByIdAndUpdate(id,req.body,{new: true,runValidators: true});
    if(!update){
      const error = new customError('document of that id is not found',404);
     return next(error);   // if not return then one more status will be sented.
    }
    resp.status(200).json({
      status: "success",
      update
    });
  })
  
    


  //   let id =  req.params.id * 1;
  //  let mov = data.find(el => el.id === id);         // here we get the movie
  
  // // if(!mov){
  // //  resp.status(404).json({
  // //    status: 'fail',
  // //    message:'no such movie'
  // //  })
  // // }
  
  
  //  let index =  data.indexOf(mov);     // here we get the index of the movie.
  //     let real_obj =   Object.assign(mov,req.body);
  //     data[index] = real_obj;
  //    fs.writeFile('./data/movies.json',JSON.stringify(data),(err)=>{
  //        resp.status(200).json({
  //          status: "sucess",
  //          data: real_obj
  //        })
  //    })

  
  

  exports.deletemovie = asyncErrorHandler(async(req,resp,next)=>{
    
       const deleteMovie =  await Movie.findByIdAndDelete(req.params.id)
         if(!deleteMovie){
          const error = new customError('document of that id is not found',404);
         return  next(error);   // if not return then one more status will be sented.
        }
         resp.status(204).json({
            status: "success",
            data: null
          })
  
         resp.send(404).json({
          status: "fail",
          message: err.message
         })
    // to access id which is route parameter by req.params
   //  console.log(req.params);
   //  resp.send("data is here");
    //  let n_id = req.params *1; // change string into a number.
    //  let deletemovie = data.find((ans)=>{
    //    if(ans.id === n_id){
    //      return ans;
    //    }
    //  })
    // let indext =  data.indexOf(deletemovie);
  
    // data.splice(indext,1);
    // fs.writeFile('./data/movies.json',JSON.stringify(data),(err)=>{
    // //  if(err){
    // //    return resp.json({
    // //      status: "fail",
    // //      message: "error has been occured."
    // //    })
    // //  }
  
  
    //     resp.status(204).json({
    //      status: "success",
    //      messege: null
    //     })
  
    // })
  
  })
  
  exports.getmoviestat = asyncErrorHandler(async(req,resp)=>{
    let real_d =  await Movie.aggregate([
        { $match :{ ratings: {$gte:5}}},
        { $group :{
          _id: null,        // because of null id grouping is working on all the document given by match.
          avgRating: {$avg: '$ratings'},
          avgPrice: {$avg: '$price'},
          minPrice:{$min:'$price'},
          maxPrice: {$max: '$price'},
          Totalprice: {$sum: '$price'},
          moviecount: {$sum: 1}
        }}
      ]);
      resp.status(200).json({
        status: "success",
        length: real_d.length,
        data: real_d
      })

    
  })

  // new things 
  exports.getMovieGenre = asyncErrorHandler(async(req,resp) =>{
      //  console.log("here in getmoviegenre");
        const genre =  req.params.genre;
        console.log(genre);
      const movies = await Movie.aggregate([
        {$unwind:'$genres'},
        {$group:{
          _id: '$genres',     // it will group the document based on the genres.
          moviecount: {$sum: 1},
          movies:{$push: '$name'}  // to push the movie name with the given genre.
        }},
        {$addFields:{genre: '$_id'}},    //to add another field in the document 
        {$project: {_id:0}},   // kya field chahiye ya nahi chahiye.
        {$sort:{moviecount:-1}},      // sort in desending order.
        // {$limit: 7}         // agar hame limit dalni ho ki itne hi document chiye hame.
        {$match: {genre: genre}}     // if the genre match to our given genre such as action ----genre => movies
      ]);
      resp.status(200).json({
        status: "success",
        data: {
          movies
        }
      })

  })