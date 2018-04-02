const mongoose  =   require('mongoose');
const validator =   require('validator');

const Department    =   mongoose.model('Department', {
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 30
    },
    dept_email_id: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: `{value} is not a valid email id`
        }
    }
});


module.exports = Department;