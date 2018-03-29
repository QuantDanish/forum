const express= require('express');
const router= express.Router();
const {answer} =require('../models/index');
const _= require('lodash');
const mongoose=require('mongoose');


// const {ObjectID}= require('mongodb');
var addAnswer= (ans)=>{
    return new Promise((resolve, reject) => {
      //  console.log(ans);
        var newans= new answer({
            _id:ans._id,
            answer_text:ans.text ,
            question_id:ans.question_id ,
            user_id: ans.user_id
        });
      //  console.log("newans"+newans);

        newans.save().then((doc)=>{
            resolve(doc);
        }).catch((e)=>{
            reject(e)
        });

    });
};

var deleteAnswer= (id)=>{
    return new Promise((resolve, reject) => {

        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     return res.status(404).send();
        // }

        answer.findByIdAndRemove(id).then((delAns) => {
            if (!delAns) {
                reject();
            }

            resolve(delAns);
        }).catch((e) => {
            reject(e);
        });
    });
};


let updateAnswer= (req)=>{
    return new Promise((resolve, reject) => {

        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     return res.status(404).send();
        // }

        var body = _.pick(req.body,['answer_text', 'modifiedAt']);
        body.modifiedAt= Date.now();
        let _id= req.body._id;
        console.log(body);
        answer.findByIdAndUpdate(_id,{$set: body}, {new: true}).then((doc)=>{
            resolve(doc);
        }).catch((e)=>{reject(e);})

    });
 };


let readAnswer=(id)=>{
  return new Promise((resolve, reject) => {

      answer.find({'question_id':id}).then((doc)=>{
          resolve(doc);
      }).catch((err)=>{
          reject(err);
      })

  });
};
//
// function readAnswer(qid) {
//     if (!id) {
//         return res.send('Enter valid Question id to read answers');
//     }
//     answer.find({question_id:{qid}});
// }

module.exports={
    addAnswer,
    deleteAnswer,
    updateAnswer,
    readAnswer
};