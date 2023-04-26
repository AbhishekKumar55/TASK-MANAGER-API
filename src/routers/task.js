const express=require('express')
const router=new express.Router()
const Task=require('../models/task')
const User = require('../models/user')
const auth=require('../middleware/auth')

router.post('/tasks',auth,async(req,res)=>{
   const task=new Task({
    ...req.body,
    owner:req.user._id
   })
   
   try{
    const tasks= await task.save()
    res.status(202).send(tasks)
}catch(e){
res.status(500).send()
}
})
// GET/task?completed=true
// GET/tasks?limit=10&skip=20
// GET/tasks?sortBy=createdAt:desc
router.get('/tasks',auth,async(req,res)=>{
    const match={}
    const sort={}

if(req.query.sortBy){
    const parts=req.query.sortBy.split(':')
    sort[parts[0]]= parts[1]==='desc'?-1:1
}


    if(req.query.completed){
match.completed= req.query.completed==='true'
    }

try{
//    const tasks= await Task.find({owner:req.user._id})
await req.user.populate({
    path:'mytask',
    match,
    options:{
        limit:parseInt(req.query.limit),
        skip:parseInt(req.query.skip),
        sort
    }
}).execPopulate()
res.send(req.user.mytask)
        // res.status(201).send(tasks)
    
    }catch(e){
        res.status(500).send()
    }
})

router.get('/tasks/:id',auth,async(req,res)=>{
    const _id=req.params.id
try{
  const tasks=await Task.findOne({_id,owner:req.user._id})

        if(!tasks){
            
          return  res.status(404).send()
        }
        res.send(tasks)
    }catch(e){
        res.status(500).send()
    }

})

router.patch('/tasks/:id',auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    const validUpdates=['description','completed']
    const isValidUpdates=updates.every((update)=>validUpdates.includes(update))
    if(!isValidUpdates){
return res.status(400).send('Invalid update parameter')
    }
    try{
        const tasks=await Task.findOne({_id:req.params.id,owner: req.user._id})
if(!tasks){
    return res.status(404).send()
}
updates.forEach((update)=>tasks[update]=req.body[update])

await tasks.save()
    //const tasks=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
if(!tasks)
{
    res.status(404).send()
}
res.send(tasks)
    }catch(e){
res.status(500).send()
    }

})

router.delete('/tasks/:id',auth,async(req,res)=>{
    try{
        const task=await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task){
          return  res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports=router