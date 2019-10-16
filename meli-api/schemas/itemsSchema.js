const Joi = require('joi');

const schema = Joi.object().keys({
  author: Joi.object().keys({
    name: Joi.string().empty(''),
    lastname: Joi.string().empty('')
  }),
  item: Joi.object().keys({
    id: Joi.string().empty(''),
    title: Joi.string().empty(''),
    price: Joi.number(),
    original_price: Joi.number().empty(''),
    picture: Joi.string().empty(''),
    condition: Joi.string().empty(''),
    free_shipping: Joi.boolean(),
    sold_quantity: Joi.number(),
    description: Joi.string().empty('')
  })
});

function itemsSchema(itemObj) {
  var item = {
    author: {
      name: '',
      lastname: ''
    },
    item: {
      id: itemObj.id,
      title: itemObj.title,
      price: itemObj.price,
      original_price: itemObj.original_price || 0,
      picture: itemObj.pictures[0]
        ? itemObj.pictures[0].url
        : itemObj.thumbnail,
      condition: itemObj.condition,
      free_shipping: itemObj.shipping.free_shipping,
      sold_quantity: itemObj.sold_quantity,
      description: itemObj.description
    }
  };

  const { error, value } = schema.validate(item);

  if (error) {
    console.log(error);
    return null;
  } else {
    return value;
  }
}

module.exports = itemsSchema;
