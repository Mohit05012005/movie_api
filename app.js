// const express = require('express');// third party package.
// const app = express();  // calling a function which is returning an object.


// // create a server

// app.get('/',(req,res)=>{
// // sending a response first status code then response.
//     // res.status(200).send("<h2>hello from express server.</h2>");
//     res.status(200).json({message:"why",superstarname:"roman reings"})
// })
// // send have data by default text/html response.

// // to handle post request
// app.post('/',(req,resp)=>{
//   res.status(200).send("hello from post request server.");
// })

//server runs http server which is capable of understanding url,receving request and delevering respond.
// connected to the client with request and respond. bridge between the frontend and backend of the web application.
// static file - static server.
// now if we want a dynamic web app that have a backend application which can talk to the data base and use those data and displays to the user.we need a server that can run a dynamic backend application. this backend application contain the code that (ye app data leti hai frontend se or req and resp ka bhi jimma utthati hain)

// const port = 4000;
// app.listen(port,()=>{
//    console.log("we have do creating a server.");
// })


// note : a route consist of http method(get,post ,delete,etc) and url(root url hai).












// const http = require('http');

// const server = http.createServer((req,resp)=>{

// });

// server.listen(5000,'127.0.0.1',()=>{
//   console.log("server is created.")
// })



// get api making .
const globalErrorHandler = require('./controller/errorcontroller');
const express = require('express');
const morgan = require('morgan');
const movierouter = require('./router/movierouter')  // not include .js file
const fs = require('fs');
const customError = require('./utils/customerror');
const app = express();  // it will give an object where there is lot of method.
const port = 4000;
// let data = JSON.parse(fs.readFileSync('./data/movies.json'));      // change into javascript object
app.use(express.json())      // add the request body to the request object.(middleware)


function logged(req,resp,next){
  console.log("middleware is called.");         // note: not receiving any response because we need to call to the next method in order to process next.
 next();
}

app.use(logged); // 1 run
app.use(morgan('dev'));  //2 run
app.use((req,resp,next)=>{       // 3 run
       req.request_date_at = new Date().toISOString();        // req obj ki ek or property banayi
     console.log(req.request_date_at);  //nya kam
       next();
});
// *ki ye hamara kab run hoga.
app.use(express.static('./public'));        // new to add static file in the url

// const newmovies = (req,resp)=>{            // route handler(call back function)
//   resp.status(200).json(                // json file in json json format because as we know that we are making rest full api which follow rest architecture.
//     {
//       requst_date: req.request_date_at,
//       status:"success",
//       count:data.length,
//       reald: data
//     }
//   );              // before sending the json data we have to format the data like (json json formating )
// }
// // get request.

// const onemovie = (req,resp)=>{
//   // console.log(req.params);      // object which hold the route parameters
  
//   // jo id hai na usi id ka object return karna hai respond me.
//    const real_id = req.params.id *1;
//  let movie = data.find(el => el.id === real_id);

//     if(!movie){
//      return resp.status(404).json({
//         status: "fail",
//         movie: "not found this movie"
//       })
//     }


//  resp.status(200).json({
//   status: "success",
//   data: {
//     movie: movie
//   }
//  })
// }


// const updatemovie = (req,resp)=>{
//   // console.log(req.body);
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
// // patch method
//   // resp.send("data is sent");
// }


// const twoupdate = (req,resp)=>{
//   let id =  req.params.id * 1;
//  let mov = data.find(el => el.id === id);         // here we get the movie

// if(!mov){
//  resp.status(404).json({
//    status: 'fail',
//    message:'no such movie'
//  })
// }


//  let index =  data.indexOf(mov);     // here we get the index of the movie.
//     let real_obj =   Object.assign(mov,req.body);
//     data[index] = real_obj;
//    fs.writeFile('./data/movies.json',JSON.stringify(data),(err)=>{
//        resp.status(200).json({
//          status: "sucess",
//          data: real_obj
//        })
//    })
// }


// const deletemovie = (req,resp)=>{
//   // to access id which is route parameter by req.params
//  //  console.log(req.params);
//  //  resp.send("data is here");
//    let n_id = req.params *1; // change string into a number.
//    let deletemovie = data.find((ans)=>{
//      if(ans.id === n_id){
//        return ans;
//      }
//    })
//   let indext =  data.indexOf(deletemovie);

//   data.splice(indext,1);
//   fs.writeFile('./data/movies.json',JSON.stringify(data),(err)=>{
//    if(err){
//      return resp.json({
//        status: "fail",
//        message: "error has been occured."
//      })
//    }


//       resp.status(204).json({
//        status: "success",
//        messege: null
//       })

//   })

// }


// const movierouter = express.Router();

// movierouter.route('/')
// .get(newmovies)
// .post(updatemovie)



// movierouter.route('/:id')        // append with the movierouter.
// .get(onemovie)
// .patch(twoupdate)
// .delete(deletemovie)

//* did not understand this .
app.use('/api/v1/movies',movierouter);        // to make a middleware call   4 run (go to movierouter file)
// default route should be in last.
app.all('*',(req,resp,next)=>{
//  resp.status(404).json({
//   status: "fail",
//   message: `can't find ${req.originalUrl} in the server!`
//  })
  // const err = new Error(`can't find ${req.originalUrl} in the server!`); // built in constructor to create error object in javascript.
  // err.statusCode  = 404;
  // err.status = "fail";
  const err = new customError(`can't find ${req.originalUrl} in the server!`,404);
  next(err);      // it will call global error handling middleware function.
})

app.use(globalErrorHandler);

module.exports = app;


// // get for movies
// app.get('/api/v1/movies',newmovies);
// // get for one movie
// app.get('/api/v1/movies/:id',onemovie);
// // post request
// app.post('/api/v1/movies',updatemovie);
// // post method ham id nahi dete kyoki vo database provide karega (jatna data pahle se hai uske hisab se.)
// app.patch('/api/v1/movies/:id',twoupdate)
// //delete request
// app.delete('/api/v1/movies/:id',deletemovie);

// put method by me

// app.put('/api/v1/movies/:id',(req,resp)=>{
//       let pid =   req.params.id *1;
//      let rdata =  data.find(el => el.id === pid);
//      let indexx =  data.indexOf(rdata);        // we got the index here
     
//      data[indexx] = Object.assign({id: req.params.id},req.body);
//      console.log(data);
//      fs.writeFile('./data/movies.json',JSON.stringify(data),(err)=>{
//       resp.status(200).json({
//         status: "sucess",
//         data: req.body
//       })
//      })
// })

// delete route

// app.delete('./api/v1/movies/:id',(req,resp)=>{           // here call back function is also a middleware.(req body wo hamari gayi req obj ->process ->(middleware -next()-) -> call to next function
//     let id = req.params.id * 1;
//    let movietodelete = data.find(el => el.id === id);
//   let indexdelete =  data.indexOf(movietodelete);
//    data.splice(1,indexdelete);           // it will mutate the array.
//    fs.writeFile('./data/movies.json',JSON.stringify(data),(err)=>{
//        resp.status(204).json({
//         status: "success",
//         data : null
//        })
//    });
  //  if(err){
  //  return resp.json({
  //     status: "fail"
  //   })
  //  }

// })


// not call
// app.use(logger);




















// to create a server.




// app.listen(port,()=>{
//   console.log("server is listened.");
// })



// route handler function works or execute for a specific request.
// but these middleware apply for the all the requests.
// we have to apply middleware before route handler.
// because it ends the middleware function call before reaching logger.
// (request response cycle has already finished). thats why logger is not called.