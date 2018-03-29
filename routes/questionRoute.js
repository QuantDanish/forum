const express=require('express');
const router = express.Router();
const {questionService}=require('../services/index');

router.get('/:practice_group_id', (req, res)=>{
    questionService.getQuestionByPG(req.params.practice_group_id,function(data){
        res.send(data);
    })
})


router.post('/',(req,res)=>{
        questionService.addQuestion(req.body, function (data) {
            res.send(data);
        })

})

router.put('/',(req, res)=>{
    questionService.editQuestion(req.body, (data)=>{
        res.send(data);
    });

})

router.delete("/",(req, res)=>{
        questionService.deleteQuestion(req.body._id,(data)=>{
            res.send(data);
        });
})

module.exports=router;