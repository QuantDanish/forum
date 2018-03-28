const express= require('express');
const router= express.Router();
const answerService= require('../services/answerService');

router.post('/addanswer',(req,res)=>{
    answerService.addAnswer(req.body);
});

router.delete('/deleteanswer',(req,res)=>{
    answerService.deleteAnswer(req.body.id);
});

router.put('/updateAnswer',(req,res)=>{
    answerService.updateAnswer(req);
});

router.get('/readAnswer',(req,res)=>{
answerService.readAnswer(req.body.qid);
});

module.exports= router;