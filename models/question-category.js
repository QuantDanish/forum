const mongoose  =   require('mongoose');
const validator =   require('validator');

const Question_Category    =   mongoose.model('Question_Category', {
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 30
    },
    pg_id: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: `{value} is not a valid email id`
        }
    }
});


module.exports = Question_Category;