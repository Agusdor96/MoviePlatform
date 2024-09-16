//maneja todos los errores que puedan aparecer en las funciones del controlador
//esto es un closure

const catchAsync = (controller) => {
    return (req, res, next) => {
        controller(req, res).catch((err)=> next(err));
    }
}

module.exports = catchAsync;