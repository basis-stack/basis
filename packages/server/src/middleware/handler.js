export default action => (req, res, next) => {

  const context = { req, res, next, ...req.params, ...req.query };

  Promise.resolve(action(context))
         .then((data) => { 
           
           if (data !== undefined) {

             res.send({ data });
           }
         })
         .catch((err) => {
           
           const status = err.status ? err.status : 500;
           const code = err.code ? err.code : 'UnknownError';
           const error = { status: `${status}`, code, title: err.message };

           res.status(status)
              .send({ errors: [error] });
         });
};