import request from 'request';
import api from '../../api';


export default (token, contract) => {
  return new Promise((resolve, reject) => {
    var options = {
      url: `https://img.cn.cryptokitties.co/${contract}/${token}.svg`,
      method: 'GET'
    };
    request(options, (error, response, body) => {
      if (error) reject(error);
      else resolve(new api.ApiResponse(
        body,
        response.headers,
        200
      ));
    });
  });
};
