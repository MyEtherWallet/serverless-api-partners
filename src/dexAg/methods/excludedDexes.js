import configs from '../config';
import {success} from '../../response';


export default body => {
  return new Promise((resolve) => {
    resolve(
      success({
        jsonrpc: '2.0',
        result: configs.EXCLUDED_DEXES,
        id: body.id
      })
    );
  });
};
