const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 120
    }
});

const Category = mongoose.model('Category', categorySchema);

function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(120).required()
    });

    return schema.validate(category);
}

exports.categorySchema = categorySchema;
exports.Category = Category;
exports.validate = validateCategory;