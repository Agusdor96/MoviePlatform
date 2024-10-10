const errorHandler = ((err, req, res, next) => {
    console.error(err); 
    const statusCode = err.code || 500;
    res.status(statusCode).json({
        error: err.name || 'InternalServerError',
        message: err.message || 'Something went wrong',
    });
});
module.exports = {
    errorHandler
}