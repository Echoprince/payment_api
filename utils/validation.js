exports.validationFailed = (errors, next) => {
    const error = new Error('Validation Failed')
    error.statusCode = 422
    error.data = errors.array()
    next(error)
}