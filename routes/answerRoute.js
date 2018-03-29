const express= require('express');
const router= express.Router();
const {answerService}= require('../services/index');

router.post('/',(req,res)=>{


    //console.log(req.body);
    console.log('enter');
    answerService.addAnswer(req.body).then((doc)=>{
        res.send(doc);
    }).catch((err)=>{
        console.log('please check input provided',err);
        next(err);
    });
});

router.delete('/',(req,res)=>{
    console.log(req.body.id);
    answerService.deleteAnswer(req.body.id).then((doc)=>{
        res.send(doc);
    }).catch((err)=>{
        console.log('can not delete-',err);
    });
});

router.put('/',(req,res)=>{

    answerService.updateAnswer(req).then((updated_data)=>{
        if (!updated_data) {
            return res.status(400).send();
        }
        res.send(updated_data);
    }).catch((e)=>{res.status(400).send();});
});

router.get('/:qid',(req,res)=>{

    answerService.readAnswer(req.params.qid).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
});

module.exports= router;