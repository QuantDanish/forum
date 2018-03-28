const mongoose=require('../config/mongooseConnection');

var question= mongoose.model({'question',{
  question_text:{
    type:String,
    trim: true,
    required: true,
    minlength:1
    },
  user_id:{
    type: String,
    minlength:1,
    required:true
    },
  practice_group_id:{
    type:String,
    required:true,
    minlength:1
    },
  question_category_id:{
     type:String,
     required:true,
     minlength:1
  },
    tags:{
      type :Object
    },
    time :{
      type : Date,
    default: Date.now,
    required:true
  }


}
});

module.exports={
  question
};