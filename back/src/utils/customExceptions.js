class Exceptions {
    static conflict(message = 'Resource already exists') {
        const error = new Error(message);
        error.code = 409;
        error.name = 'ConflictException';
        throw error;
    }    
    static badRequest(message = 'Bad Request') {
        const error = new Error(message);
        error.code = 400;
        error.name = 'BadRequestException';
        throw error;
    }    
    static internalServerError(message = 'Internal Error') {
        const error = new Error(message);
        error.code = 500;
        error.name = 'InternalServerError';
        throw error;
    }    
}

module.exports = Exceptions