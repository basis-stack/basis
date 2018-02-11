import axios from 'axios';

import { core } from 'basis-client/modules';

export default () => dispatch => (

  axios.get('/config')
       .then((res) => {

         dispatch(core.actions.initialise(res.data));
       })
       .catch((err) => {

         throw (err);
       })
);