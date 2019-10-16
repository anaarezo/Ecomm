var urlConfig = require('../urlconfig');

// DEFINIR client_id e secret_key no ARQUIVO DE CONFIGURACAO (urlConfig.js)

module.exports = function(app, meliObject) {
  app.get('/auth/authcode', function(req, res) {
    res.redirect(meliObject.getAuthURL(urlConfig.redirect_uri));
  });

  app.get('/auth/callback', function(req, res) {
    var code = req.query.code;
    meliObject.authorize(code, urlConfig.redirect_uri, function(err, data) {
      if (err) {
        console.log(err);
        res.send('Error');
      } else {
        res.send(JSON.stringify(data));
      }
    });
  });
};
