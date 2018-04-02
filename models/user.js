const mongoose  =   require('mongoose');
const validator =   require('validator');

const userSchema=   new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    firstname: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 15,
        trim: true,
        validate: {
            validator: validator.isAlphanumeric,
            message: '{value} is not a valid password'
        }
    },
    dob: {
        type: Number,
    },
    google_id: {
        type: String
    },
    phone_number: {
        type: Number
    },
    email_id: {
        // implement a validator.
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{value} is not a valid email'
        }
    },
    employee_id: {
        type: String,
        required: true,
        default: 'Not specified'
    },
    photo: {
        type: String
    },
    skype_id: {
        // implement a validator.
        type: String
    },
    title: {
        type: String,
        /*required: true,*/
        default: 'Not Specified'
    },
    practice_group: {
        type: String,
        default: 'Not Specified'
    },
    about_me: {
        type: String,
        default: 'Not Specified'
    },
    department_id: {
        type: String,
        default: 'Not Specified'
        /*required: true*/

    },
    isblocked: {
        type: Boolean,
        required: true,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
});

const User  =   mongoose.model('User',userSchema);

module.exports = {User};