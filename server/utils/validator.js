const Joi = require('joi');

const createNoteSchema = Joi.object({
  title: Joi.string().min(3).max(120).required(),
  content: Joi.string().allow('').max(2000).optional()
});

const updateNoteSchema = Joi.object({
  title: Joi.string().min(3).max(120).optional(),
  content: Joi.string().allow('').max(2000).optional()
}).min(1); // at least one field required

module.exports = {
  createNoteSchema,
  updateNoteSchema
};
