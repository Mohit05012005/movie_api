module.exports = (func)=>{
    return (req,res,next)=>{   // anonmous function ...
      func(req,res,next).catch(err=>next(err));
    }
  }