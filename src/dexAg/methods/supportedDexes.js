import configs from '../config';
import {error, success} from '../../response';


export default body => {
  return new Promise((resolve, reject) => {
    resolve(
      success({
        jsonrpc: '2.0',
        result: configs.SUPPORTED_DEXES,
        id: body.id
      })
    );
  });
};
