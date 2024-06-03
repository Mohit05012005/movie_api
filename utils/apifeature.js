class apifeatures{
    constructor(query,querystr){
         this.query = query;
        this.querystr = querystr; 
    }
    filter(){
        // console.log(this.query);
        let querystring = JSON.stringify(this.querystr);
        querystring = querystring.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`);
        const queryobj = JSON.parse(querystring);
              this.query = this.query.find(queryobj);
              return this;
    }

    sort(){
        
        if(this.querystr.sort){
            const sortedat = this.querystr.sort.split(',').join(' ');
            this.query = this.query.sort(sortedat);  // mongoose .sort is a query method where as await Movie.sort() (movie) is array.       
         }
      
         else{                // ye pta nahi
          this.query.sort("-createdAt");
         }
         return this;
    }
    field(){
        if(this.querystr.fields){
            //  Movie.select("name duration price rating");
        
            const fields = this.querystr.fields.split(',').join(' ');
              this.query = this.query.select(fields);
        
            }
            else{
             this.query =  this.query.select("-__v");
            }
            return this;
    }
     pagination(){
        const page = this.querystr.page;
        const limit = this.querystr.limit;
        const skip = (page-1)*10;
        this.query = this.query.skip(skip).limit(limit);
        
        // if(this.querystr.page){
        //   const countmovie = await Movie.countDocuments();
        //   if(countmovie >= skip){
        //     throw new Error("the page is not found!");
        //   }
        // }
        return this;
    }

}
module.exports = apifeatures;