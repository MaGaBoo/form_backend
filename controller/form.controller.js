const createError = require('http-errors');
const Contact = require('../models/Contact.model');

module.exports.create = (req, res, next) => {
    // receive data form here
    let newContact = req.body

    Contact.create(newContact)
    .then(contact => {
        res.status(201).json(contact);
    })
    .catch(next)
};




