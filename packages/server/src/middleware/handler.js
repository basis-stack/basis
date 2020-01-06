export default action => (req, res, next) => {

  const context = { req, res, next, ...req.params, ...req.query };

  Promise.resolve(action(context))
         .then(data => {

           if (data !== undefined) {

             res.send({ data });
           }
         })
         .catch(err => {

           next(err);
         });
};