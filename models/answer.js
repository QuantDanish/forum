const {mongoose}=require('../config/mongooseConnection');

var answer= mongoose.model('answer',{
    _id:{
    type:Number
    },
    answer_text:{
        type:String,
        trim: true,
        required: true,
        minlength:1
    },
    question_id:{
        type: String,
        minlength:1,
        required:true
    },
    user_id:{
        type: String,
        minlength:1,
        required:true
    },
    time :{
        type : Date,
        default: Date.now,
        required: true
    },
    modifiedAt:{
    type: Date
    }
});

module.exports={
    answer
};
