const customError = require('./../utils/customerror')

// development error
const devError = (error,res)=>{
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stackTrace: error.stack,    // what type and where error has occured.
    error: error
})
}


const castErrorHandler = (error)=>{
     const msg = `wrong ${error.path} : ${error.stringValue}`;
    return new customError(msg,400); // 400 means bad request.
}

const duplicateKeyErrorHandler = (err)=>{
  const msg = `the given movie : ${err.keyValue.name} is a repeated movie.`
   return new customError(msg,400); // 400 bad request.
}

// production error
const prodError = (error,res)=>{
  if(error.isoperational === true){
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message
    })
  }

    else{            // agar error created by moongoose then tell the error.
      res.status(500).json({
        status: 'error',
        message: 'something went wrong ! please try again later.'
      })
    }
}



module.exports = (error,req,res,next)=>{      // global error handling middleware.
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if(process.env.NODE_ENV === 'development'){
     devError(error,res);
    }
    
    else if(process.env.NODE_ENV === 'production'){
     if(error.name === 'CastError'){
        error = castErrorHandler(error);    // error related to the moongose.
     // let e = {...error} // destructuring syntax.(which destructure the object).
      }

      // error because of moongose driver and because of that it do not contains name property in the document.
     if(error.code === 11000){
      error = duplicateKeyErrorHandler(error);
     }
      prodError(error,res);
 
    }

  }
// in production only operational error tranfer and not the coding error.
