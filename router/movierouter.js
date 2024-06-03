// for only movie router
const express = require('express');
const Movie = require('./../models/moviemodels');          // we will use schema where we do crud operation.
const moviecontroller = require('./../controller/moviecontroller');
// const fs = require('fs');
// // let data = JSON.parse(fs.readFileSync('./data/movies.json'));      // change into javascript object
// const newmovies = (req,resp)=>{            // route handler(call back function)
//     resp.status(200).json(                // json file in json json format because as we know that we are making rest full api which follow rest architecture.
//       {
//         requst_date: req.request_date_at,
//         status:"success",
//         count:data.length,
//         reald: data
//       }
//     );              // before sending the json data we have to format the data like (json json formating )
//   }
//   // get request.
  
//   const onemovie = (req,resp)=>{
//     // console.log(req.params);      // object which hold the route parameters
    
//     // jo id hai na usi id ka object return karna hai respond me.
//      const real_id = req.params.id *1;
//    let movie = data.find(el => el.id === real_id);
  
//       if(!movie){
//        return resp.status(404).json({
//           status: "fail",
//           movie: "not found this movie"
//         })
//       }
  
  
//    resp.status(200).json({
//     status: "success",
//     data: {
//       movie: movie
//     }
//    })
//   }
  
  
//   const updatemovie = (req,resp)=>{
//     // console.log(req.body);
//    let id = data.length + 1 ;
//    let movie = Object.assign({ id: id},req.body);      // to merge two object into a new object
//    console.log(movie);
//    data.push(movie);
//    fs.writeFile('./data/movies.json',JSON.stringify(data),(err)=>{
//         resp.status(201).json({
//           status: "success",
//           count: data.length,
//           movies: {
//             moviess: movie
//           }
//         })
//    });
//   // patch method
//     // resp.send("data is sent");
//   }
  
  
//   const twoupdate = (req,resp)=>{
//     let id =  req.params.id * 1;
//    let mov = data.find(el => el.id === id);         // here we get the movie
  
//   if(!mov){
//    resp.status(404).json({
//      status: 'fail',
//      message:'no such movie'
//    })
//   }
  
  
//    let index =  data.indexOf(mov);     // here we get the index of the movie.
//       let real_obj =   Object.assign(mov,req.body);
//       data[index] = real_obj;
//      fs.writeFile('./data/movies.json',JSON.stringify(data),(err)=>{
//          resp.status(200).json({
//            status: "sucess",
//            data: real_obj
//          })
//      })
//   };
  
  
//   const deletemovie = (req,resp)=>{
//     // to access id which is route parameter by req.params
//    //  console.log(req.params);
//    //  resp.send("data is here");
//      let n_id = req.params *1; // change string into a number.
//      let deletemovie = data.find((ans)=>{
//        if(ans.id === n_id){
//          return ans;
//        }
//      })
//     let indext =  data.indexOf(deletemovie);
  
//     data.splice(indext,1);
//     fs.writeFile('./data/movies.json',JSON.stringify(data),(err)=>{
//      if(err){
//        return resp.json({
//          status: "fail",
//          message: "error has been occured."
//        })
//      }
  
  
//         resp.status(204).json({
//          status: "success",
//          messege: null
//         })
  
//     })
  
//   }
  



const movierouter = express.Router();
// movierouter.param('id',moviecontroller.checkid)         // 5 run (if have route parameter in the url eg> id)

movierouter.route('/')                   // 6 run (according to the request client sented)
.get(moviecontroller.newmovies)
.post(moviecontroller.updatemovie) // one -> next middleware(chaning of middleware)
// there is also a moviechecker using middleware.

movierouter.route('/highest-rated').get(moviecontroller.highrated,moviecontroller.newmovies)   // here highrated is the middleware.
movierouter.route('/movie-stat/:id').get(moviecontroller.getmoviestat);
movierouter.route('/movie-genre/:genre').get(moviecontroller.getMovieGenre);
movierouter.route('/:id')        // append with the movierouter.
.get(moviecontroller.onemovie)
.patch(moviecontroller.twoupdate).delete(moviecontroller.deletemovie)


module.exports = movierouter;

// 