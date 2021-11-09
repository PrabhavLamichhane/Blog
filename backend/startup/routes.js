const express = require('express');

const error = require('../middleware/error');
const categories = require('../routes/categories');
const blogs = require('../routes/blogs');
const users = require('../routes/users');
const auth = require('../routes/auth');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/categories', categories);
    app.use('/api/blogs', blogs);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
}