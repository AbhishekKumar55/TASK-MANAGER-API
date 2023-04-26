require('../src/db/mongoose')
const Task=require('../src/models/task')

// Task.findByIdAndRemove('6443a0f79701d5297c34c664').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount=async(id)=>{
    const task= await Task.findByIdAndRemove(id)
const count=await Task.countDocuments({completed:false})
return count
}
deleteTaskAndCount('644401675f543c391013b2f6').then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})