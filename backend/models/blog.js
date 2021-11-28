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
    description: {
        type: String,
        required: true,
        // minlength: 20,
        // maxlength: 5000
    },
    user: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        displayName: String
    },
    tags: [String],
    isPublished: {
        type: Boolean,
        default: false
    }
}));

function validateBlog(blog) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        description: Joi.string().required().min(15).messages({
            "string.base": `Blog Description contain is required`,
            'string.min': `Your blog is too short. Blog Desciption should have a minimum length of {#limit} characters.`,
            "string.empty": `"" must contain value`,
            "string.pattern.base": `"" must be 10 digit number`,
            "any.required": `"" is a required field`
        }),
        user: Joi.object().keys({
            userId: Joi.objectId().required(),
            displayName: Joi.string().required()
        }).required(),
        tags: Joi.array(),
        isPublished: Joi.boolean()
    });
    return schema.validate(blog);
}

exports.Blog = Blog;
exports.validate = validateBlog;