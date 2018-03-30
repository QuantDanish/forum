
const mongoose  =   require('mongoose');
const quesSchema= require('../models/question')

function addQuestion(addQues,cb){
    let question= new quesSchema({
        question_text:addQues.question_text,
        user_id:addQues.user_id,
        practice_group_id:addQues.practice_group_id,
        question_category_id:addQues.question_category_id,
        tags:null,
        views:0,
    });
    quesSchema.find({question_text:question.question_text,user_id:question.user_id})
        .then((quesArray)=> {
            if (quesArray.length!==0) {
                console.log("same ques");
                cb("question already exists by the same user")
            }
            else {
                question.save().then((doc) => {
                    console.log("doc" + doc);
                    cb(doc);
                }, (e) => {
                    console.log(e);
                    cb("error occurred can't add question");
                })
            }
        });
}



function getQuestionByPG(practiceGroupId,cb){
        quesSchema.find({practice_group_id :practiceGroupId}).then((myArray)=>{
            if(myArray.length===0){
                console.log("no ques till now of this deptt");
                cb("no ques till now of this deptt");
            }
            else{
                cb(myArray);
            }

        }).catch((e)=>{
            console.log(e);
            cb ("error occured");
    });
}


function editQuestion(question,cb){
    let oldValue={_id:question._id, user_id:question.user_id};
    let newValue={$set:{question_text:question.question_text,practice_group_id:question.practice_group_id}};
    quesSchema.findByIdAndUpdate(oldValue,newValue).then((updateque)=>{
        cb(updateque)
    }).catch((e)=>{
      cb(e);
    })
}

function deleteQuestion(que_id,cb){
    quesSchema.findByIdAndRemove({_id:que_id}).then((delQues)=>{
        if(!delQues){
            cb("ques doesn't exist");
        }
        cb(delQues)
    }).catch((e)=>{
        cb(e);
    })

}


module.exports={
    addQuestion:addQuestion,
    editQuestion:editQuestion,
    deleteQuestion:deleteQuestion,
    getQuestionByPG:getQuestionByPG

};

