const https = require('https');
const url = require('url');

//https://api.mercadolibre.com/sites/MLB/search?q=query&limit=number
function requestURL(query, limit) {
  return url.parse(
    url.format({
      protocol: 'https',
      hostname: 'api.mercadolibre.com',
      pathname: '/sites/MLB/search',
      query: {
        q: query || '',
        limit: limit || 4
      }
    })
  );
}

function httpGetJSON(requestUrl) {
  return new Promise((resolve, reject) => {
    https
      .get(
        {
          hostname: requestUrl.hostname,
          path: requestUrl.path,
          headers: {
            'Content-Type': 'application/json'
          }
        },
        res => {
          res.setEncoding('utf8');
          let body = '';
          res.on('data', chunk => (body += chunk));
          res.on('end', () => resolve(body));
        }
      )
      .on('error', reject);
  });
}

module.exports = {
  requestURL: requestURL,
  httpGetJSON: httpGetJSON
};
