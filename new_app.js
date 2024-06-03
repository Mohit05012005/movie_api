// const express = require('express');
// const fs = require('fs');

// const movies =(require('./data/movies.json'));
// console.log(movies);

const express = require('express');
const fs = require('fs');
const app = express();  // it will give an object where ther e is lot of method.
const port = 5000;
let data = JSON.parse(fs.readFileSync('./data/movies.json'));      // change into javascript object
app.use(express.json()) 


app.get('/api/v1/movies',(req,resp)=>{            // route handler(call back function)
    resp.status(200).json(                // json file in json json format because as we know that we are making rest full api which follow rest architecture.
      {
        "status":"success",
        "count":data.length,
        "reald": data
      }
    );              // before sending the json data we have to format the data like (json json formating )
  })



  app.get('/api/v1/movies/:id',(req,resp)=>{
    // console.log(req.params);      // object which hold the route parameters
    
    // jo id hai na usi id ka object return karna hai respond me.
     const real_id = req.params.id *1;
   let movie = data.find(el => el.id === real_id);

      if(!movie){
       return resp.status(404).json({
          status: "fail",
          movie: "not found this movie"
        })
      }


   resp.status(200).json({
    status: "success",
    data: {
      movie: movie
    }
   })
})





app.listen(port,()=>{
    console.log("server is listened.");
  })
  

