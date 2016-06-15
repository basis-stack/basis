export class ErrorsController {

    static handle404(req, res, next) {

        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    }

    static handleServerError(err, req, res, next) {

        res.status(err.status || 500);
        res.send(err.message);
    }
}