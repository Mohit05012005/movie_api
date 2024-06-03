class customError extends Error{
    constructor(message,statusCode){
        // this.message = message;
        super(message); 
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode<500 ? "fail":"error";
        this.isoperational = true; // check property 
        Error.captureStackTrace(this,this.constructor);
    }
}
module.exports = customError;
// here we want to capture the statures which tell us where the error has been occured.
// base error class automatically capture the statrus.