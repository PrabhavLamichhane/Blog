const express = require('express');
const moment = require('moment');
const { padStart } = require('lodash');

const { Category } = require('../models/category');
const { Blog, validate } = require('../models/blog');
const { User } = require('../models/user');
const validateObjectId = require('../middleware/validateObjectId');

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

    let user;
    if (req.body.user) {
        user = await User.findById(req.body.user.userId);
        if (!user) return res.status(400).send('Invalid userId.');
        if (user.displayName.toLowerCase() !== req.body.user.displayName) return res.status(400).send('Invalid name')
    } else {
        return res.status(400).send('Invalid user.');
    }

    let blog = new Blog({
        title: req.body.title,
        description: req.body.description,
        user: {
            userId: user._id,
            displayName: user.displayName
        },
        tags: req.body.tags,
        publishDate: moment().toJSON()
    });
    await blog.save();

    res.send(blog);
});

router.put('/:id', validateObjectId, async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user;
    if (req.body.user) {
        user = await User.findById(req.body.user.userId);
        if (!user) return res.status(400).send('Invalid userId.');
        if (user.displayName.toLowerCase() !== req.body.user.displayName) return res.status(400).send('Invalid name')
    } else {
        return res.status(400).send('Invalid user.');
    }

    const blog = await Blog.findByIdAndUpdate(
        req.params.id, {
            title: req.body.title,
            description: req.body.description,
            user: {
                userId: user._id,
                displayName: user.displayName
            },
            tags: req.body.tags,
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