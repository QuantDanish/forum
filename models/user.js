const mongoose  =   require('mongoose');

const Schema    =   mongoose.Schema;

const userSchema=   new Schema({
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
    dob: {
        type: Object,
    },
    phone_number: {
        type: Number
    },
    email_id: {
        // implement a validator.
        type: String,
        required: true,
        /*validate: {
            validator: (email)=> {
                return /\w+@\w.com/
            }
        }*/
    },
    employee_id: {

        type: String,
        required: true
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
        required: true
    },
    practice_group: {
        type: String,
    },
    about_me: {
        type: String
    },
    department_id: {
        type: String,
        required: true
    },
    isblocked: {
        type: Boolean,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

const User  =   mongoose.model('user', userSchema);

module.exports = {User};