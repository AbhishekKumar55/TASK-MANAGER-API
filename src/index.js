const express=require('express')
require('./db/mongoose')
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')

const app=express()
const port = process.env.PORT||3000

// const multer=require('multer')
// const upload=multer({
//     dest:'images',
//     limits:{
//         fileSize:1000000
//     },
//     fileFilter(req,file,cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
// return cb(new Error('Please upload a doc'))
//         }
// cb(undefined,true)
//     }
// })

// app.post('/upload',upload.single('upload'),(req,res)=>{

//     res.send()
// },(error,req,res,next)=>{
//     res.status(400).send({error:error.message})
// })



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log('server is up on port '+ port)
})





// const Task = require('./models/task')
// const User=require('./models/user')

// const main = async()=>{
//     // const task = await Task.findById('6446ef388eea8a2bd8489ce6')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

// // const user =await User.findById('6446edce9a8bbf1b302f2691')
// // await user.populate('mytask').execPopulate()
// // console.log(user.mytask)

// }
// main()


// app.use((req,res,next)=>{
// if(req.method==='GET'){
// res.send('GET requests are disabled')
// }else{
//     next()
// }
// })

// app.use((req,res,next)=>{
//         res.status(503).send('Under maintainance,will be back sortly')
//     })
