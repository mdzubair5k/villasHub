const Joi = require("joi");


// module.exports.listingSchema = Joi.object({
//   listing: Joi.object({
//     title: Joi.string().required(),
//     description: Joi.string().required(),
//     location: Joi.string().required(),
//     price: Joi.number().required().min(0),
//     country: Joi.string().required(),
//     image: Joi.object({
//       filename: Joi.string().required(), // Filename required hai
//       url: Joi.string().uri().required() // URL valid aur required hai
//     }).allow(null), // Agar `image` nahi hai toh null bhi allowed hoga
//   }).required(),
// });

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.number().required().min(0),
    country: Joi.string().required(),
    image: Joi.string().allow("", null), // Agar image null ho, to bhi allow karein
  }).required(),
});



// module.exports.listingSchema = Joi.object({
//   listing: Joi.object({
//     title: Joi.string().required(),
//     description: Joi.string().required(),
//     location: Joi.string().required(),
//     price: Joi.number().required().min(0),
//     country: Joi.string().required(),
//     image: Joi.string().allow("", null),
//   }).required(),
// });

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
