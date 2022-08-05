const mongoose = require('mongoose');

// This regex matches provides email with valid format
const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        surname: {
            type: String,
            required: true
        },

        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            match: [EMAIL_PATTERN, 'Please provide a valid format!']
        },

        mobile: {
            type: Number,
            required: true,
            minlength: (9),
            maxlength: (11)
        },

        link: {
            type: String,
            required: true
        },

        message: {
            type: String,
            minlength: (1),
            required: true
        }
    },
    {timestamps: true } // TODO: añadir toJSON transform etc en caso de ser necesario
)

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;