const configInfo = require('../config')

var options = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/coins',
  headers: {
    'x-rapidapi-host': configInfo.hostName,
    'x-rapidapi-key': configInfo.apiKey,
    useQueryString: true
  }
};

exports.options = options;
