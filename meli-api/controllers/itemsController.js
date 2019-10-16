var urlConfig = require('../urlconfig');
const schemas = require('../schemas/schemas');

module.exports = function(app, meliObject) {
  app.get('/api/items', function(req, res, next) {
    var query = req.query.q;
    meliObject.get(
      `/sites/${urlConfig.site_id}/search`,
      {
        q: query,
        limit: 4
      },
      function(err, data) {
        res.json(schemas.SearchSchema(data));
      }
    );
  });

  app.get('/api/items/:id', function(req, res) {
    var id = req.params.id;
    meliObject.get(`/items/${id}`, function(err, item) {
      console.log(item);
      meliObject.get(`/items/${id}/description`, function(
        err,
        itemDescription
      ) {
        item.description = itemDescription.plain_text;
        res.json(schemas.ItemsSchema(item));
      });
    });
  });
};
