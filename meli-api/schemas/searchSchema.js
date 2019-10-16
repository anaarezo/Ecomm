const Joi = require('joi');

const schema = Joi.object().keys({
  author: Joi.object().keys({
    name: Joi.string().empty(''),
    lastname: Joi.string().empty('')
  }),
  categories: Joi.array().items(Joi.string()),
  items: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      title: Joi.string(),
      price: Joi.number(),
      picture: Joi.string(),
      condition: Joi.string(),
      city: Joi.string(),
      free_shipping: Joi.boolean()
    })
  )
});

function searchSchema(searchObj) {
  var categories = [];
  var items = [];

  searchObj.results.forEach((item, index, list) => {
    if (categories.indexOf(item.category_id) == -1) {
      categories.push(item.category_id);
    }

    items.push({
      id: item.id,
      title: item.title,
      price: item.price,
      picture: item.thumbnail,
      condition: item.condition,
      city: item.address.city_name,
      free_shipping: item.shipping.free_shipping
    });
  });

  const { error, value } = schema.validate({
    author: {
      name: '',
      lastname: ''
    },
    categories: categories,
    items: items
  });

  if (error) {
    console.log(error);
    return null;
  } else {
    return value;
  }
}

module.exports = searchSchema;
