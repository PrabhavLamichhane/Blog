const Joi = require('joi');
const mongoose = require('mongoose');

const { categorySchema } = require('./category');


const Blog = mongoose.model('Blog', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: categorySchema,
        required: true
    },
    description: {
        type: String,
        required: true,
        // minlength: 20,
        // maxlength: 5000
    }
}));

function validateBlog(blog) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        categoryId: Joi.objectId().required(),
        description: Joi.string().required().min(15).messages({
            "string.base": `Blog Description contain is required`,
            'string.min': `"Blog Desciption" should have a minimum length of {#limit}`,
            "string.empty": `"" must contain value`,
            "string.pattern.base": `"" must be 10 digit number`,
            "any.required": `"" is a required field`
        })
    });

    return schema.validate(blog);
}

exports.Blog = Blog;
exports.validate = validateBlog;