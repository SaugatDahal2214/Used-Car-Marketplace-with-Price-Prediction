const notFound = (req,res,next)=>{
    const error = new Error(`Not Found: ${req.originalURL}`)
    res.status(404)
    next(error)
}


const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Get the status code from the response object
    res.status(statusCode); // Set the status code of the response
    res.json({
        message: err?.message,
        stack: err?.stack
    });
};



module.exports = {notFound, errorHandler}