const express = require('express');

const error = require('../middleware/error');
const categories = require('../routes/categories');
const blogs = require('../routes/blogs');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/categories', categories);
    app.use('/api/blogs', blogs);
    app.use(error);
}