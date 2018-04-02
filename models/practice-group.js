const mongoose  =   require('mongoose');

const Practice_Group    =   mongoose.model('Practice_Group', {
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 30
    },
    dept_id: {
        type: String,
        required: true,
        trim: true,
    }
});

module.exports = Practice_Group;