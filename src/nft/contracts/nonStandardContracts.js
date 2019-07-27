import request from 'request';
import api from '../../api';
import {error} from '../../response';


export default (contract, address, offset = 0) => {
  switch (contract) {
    case '0x06012c8cf97bead5deae237070f9587f8e7a266d':
      return new Promise((resolve, reject) => {
        var options = {
          url: `https://api.cryptokitties.co/kitties?owner_wallet_address=${address}&limit=100&offset=${offset}`,
          method: 'GET'
        };
        request(options, (error, response, body) => {
          if (error) reject(error);
          else resolve(new api.ApiResponse(
            body,
            {
              contentType: "application/json"
            },
            200
          ));
        });
      });
    default:
      return Promise.reject(error(`non-Standard contract ${contract} not supported`));
  }

};
