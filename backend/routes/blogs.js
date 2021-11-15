const express = require('express');
const moment = require('moment');

const { Category } = require('../models/category');
const { Blog, validate } = require('../models/blog');
const validateObjectId = require('../middleware/validateObjectId');
const { padStart } = require('lodash');

const router = express.Router();

router.get('/', async(req, res) => {
    const pageNumber = parseInt(req.query.pageNumber);
    const pageSize = parseInt(req.query.pageSize);

    const blogs = await Blog.find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .select('-__v')
        // .count()
        .sort('name');

    const blogCount = await Blog.find().count()
    res.send({
        blogs: blogs,
        count: blogCount
    });
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send('Invalid category.');

    let blog = new Blog({
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        description: req.body.description,
        publishDate: moment().toJSON()
    });
    await blog.save();

    res.send(blog);
});

router.put('/:id', validateObjectId, async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send('Invalid category.');

    const blog = await Blog.findByIdAndUpdate(
        req.params.id, {
            title: req.body.title,
            category: {
                _id: category._id,
                name: category.name
            },
            description: req.body.description,
            publishDate: moment().toJSON()
        }, { new: true }
    );

    if (!blog)
        return res.status(404).send('The blog with the given ID was not found');

    res.send(blog);
});

router.delete('/:id', validateObjectId, async(req, res) => {
    const blog = await Blog.findByIdAndRemove(req.params.id);

    if (!blog)
        return res.status(404).send('The blog with the given ID was not found');

    res.send(blog);
});

router.get('/:id', validateObjectId, async(req, res) => {
    const blog = await Blog.findById(req.params.id).select('-__v');

    if (!blog)
        return res.status(404).send('The blog with the given ID was not found');

    res.send(blog);
});

module.exports = router;