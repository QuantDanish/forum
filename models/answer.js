const mongoose=require('mongoose');


var answerSchema= new mongoose.Schema({
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
        type : Number,
        default: Date.now,
        required: true
    },
    modifiedAt:{
        type: Number,
        default:Date.now()
    }
});


const answer  =   mongoose.model('answer', answerSchema);

module.exports= answer;
