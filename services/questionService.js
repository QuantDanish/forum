var mongoose = require('./config/mongooseConnection');
var quesSchema= require('./models/question.js')
function addQuestion(addQues){
    let question= new quesSchema({
        question_text:,
        user_id:,
        practice_group_id:,
        question_category_id:,
        tags:,
        views:,
    })

     question.save().then((doc)=>{
         res.send(doc);
     },(e)=>{
         res.status(400).send(e);
     })
}

function editQuestion(question){
    let oldValue={};
    let newValue={$set:{}};
    question.findByIdAndUpdate(oldValue,newValue).then((updateque)=>{
        if(!updateque){
            return res.status(404).send()
        }
        res.send(updateque);

    }).catch((e)=>{
       res.send(400).send(e);
    })


}

function deleteQuestion(que_id){

    question.findByIdAndRemove(ques_id).then((delQues)=>{
        if(!delQues){
           return res.status(404).send()
        }
        res.send(delQues);
    })
        .catch((e)=>{
        res.send(400).send(e);
    })

    }




