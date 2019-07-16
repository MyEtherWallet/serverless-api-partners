import request from 'request';
import api from '../../api';


export default (token, contract) => {
  return new Promise((resolve, reject) => {
    var options = {
      url: `https://img.cn.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${token}.svg`,
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
