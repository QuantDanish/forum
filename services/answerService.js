const mongoose=require('../config/mongooseConnection');
const AnswerSchema =require('../models/answer');
const _= require('lodash');
// const {ObjectID}= require('mongodb');

function addAnswer(ans){
var newans= new AnswerSchema({
    text:ans.text ,
    question_id:ans.question_id ,
    user_id: ans.user_id
});

 newans.save().then((doc)=>{
    console.log('Your answer has been submitted');
    },(e)=>{console.log('Oops!...Error in submitting answer.');}
    )
}
function deleteAnswer(id){

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).send();
    // }

    answer.findByIdAndRemove(id).then((delAns) => {
        if (!delAns) {
            return res.status(404).send();
        }

        res.send(delAns);
    }).catch((e) => {
        res.status(400).send();
    });

}
function updateAnswer(req){
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).send();
    // }

    var body = _.pick(req.body, ['text', 'modifiedAt']);
    body.modifiedAt= new Date.now();
    answer.findByIdAndUpdate(id,{$set: body}, {new: true}).then((updated_data)=>{
        if (!updated_data) {
            return res.status(404).send();
        }
        console.log(updated_data);
    }).catch((e)=>{
        res.status(400).send();
    })

}

function readAnswer(qid) {
    if (!id) {
        return res.send('Enter valid Question id to read answers');
    }
    answer.find({question_id:{qid}});
}