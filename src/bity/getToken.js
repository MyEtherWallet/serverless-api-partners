import configs from './config';
import request from 'request';


const getToken = (type = 1) => {
  return new Promise((resolve, reject) => {
    let options = {
      'method': 'POST',
      'url': 'https://connect.bity.com/oauth2/token',
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        'grant_type': 'client_credentials',
        'scope': type !== 1 ? 'https://auth.bity.com/scopes/exchange.place' : 'https://auth.bity.com/scopes/exchange.client-history',
        'client_id': configs.BITY_OAUTH_CLIENT_ID,
        'client_secret': configs.BITY_OAUTH_CLIENT_SECRET
      }
    };
    return request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(JSON.parse(response.body)); // todo remove dev item
      resolve(JSON.parse(response.body).access_token);
    });
  });
};

export default getToken;