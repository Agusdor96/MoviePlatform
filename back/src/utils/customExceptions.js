class Exceptions {
    static Conflict(message = 'Resource already exists') {
        const error = new Error(message);
        error.code = 409;
        error.name = 'ConflictException';
        return error;
    }  

    static NotFound(message = 'Resource Not Found') {
        const error = new Error(message);
        error.code = 404;
        error.name = 'NotFoundException';
        return error;
    }   

    static BadRequest(message = 'Bad Request') {
        const error = new Error(message);
        error.code = 400;
        error.name = 'BadRequestException';
        return error;
    } 

    static Forbidden(message = 'Forbidden Request') {
        const error = new Error(message);
        error.code = 403;
        error.name = 'ForbiddenRequest';
        return error;
    }  

    static Unauthorized(message = 'Request has no access') {
        const error = new Error(message);
        error.code = 401;
        error.name = 'Unauthorized';
        return error;
    }  

    static InternalServerError(message = 'Internal Error') {
        const error = new Error(message);
        error.code = 500;
        error.name = 'InternalServerError';
        return error;
    }    
}

module.exports = Exceptions