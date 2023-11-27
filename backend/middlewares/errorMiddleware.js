// Default middleware for express is a html page but we're creating an API. So I want 
// my errors to be JSON object which has a message and stack in development



// catch all the errors for any routes that dont exist
const notfound = (req,res,next) =>{
  const error = new Error(`not found ${req.originalUrl}`)
  next(error)
}

// catch all the errors occur in our routes
const errorHandler = (err, req,res,next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode ? res.statusCode : 500
  let message = err.message

  if (err.name === 'CastError' && err.kind === 'ObjectId'){
    statusCode = 404;
    message = 'Resource not found'
  }

  res.status(statusCode).json({
    message,
    stack : process.env.NODE_ENV !== "development" ?  "🥞" : err.stack 
  })
}

export {errorHandler, notfound}