//CRUD create read update delete

// const mongodb=require('mongodb')
// const MongoClient= mongodb.MongoClient

// const connectionURL='mongodb://127.0.0.1:55431'
// const databaseName='task-manager'

// // MongoClient.connect(connectionURL,{ useNewUrlParser: true},(error,client)=>{
// // if(error){
// //   return  console.log('Unable to connect to database!')
// // }
// // console.log('Connected correctly')
// // })

// const client=new MongoClient(connectionURL)
// const db=client.db(databaseName)
// console.log(db)

const {MongoClient,ObjectId} = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
const database = 'task-manager'
const client = new MongoClient(url)

// const id= new ObjectId()
// console.log(id.id.length)
// console.log(id.toString().length)
// console.log(id.getTimestamp())





async function getData() {
    let data = await client.connect()
    let db = data.db(database)
    let collection = db.collection('products')
    let response = await collection.find({}).toArray(); 


// db.collection('users').updateOne({
//     _id: new ObjectId("6441731298c8e8b686612deb")
// },{
// $inc:{
//     age:2
// }
// }).then((result)=>{
//     console.log(result)
// }).catch((error) =>{
//     console.log(error)
// })

// db.collection('task').updateMany({
//     completed: false
// },{
// $set:{
//     completed:true
// }
// }
// ).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })

// db.collection('users').deleteMany({
//     age:27
// }).then((result)=>{
// console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })

// db.collection('task').deleteOne({
//     description:'read'
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })











//   var document=db.collection('users').findOne({name:'Abhishek'})
//   if(document){
//     var myname=document.name
//     console.log(myname)
//   }

//   db.collection('users').find({age:27}).toArray((error,users)=>{
//     console.log(users)
//   })

//   db.collection('users').find({age:27}).count((error,count)=>{
//     console.log(count)
//   })

// db.collection('task').findOne({_id: new ObjectId("64418398cd63a1820225dff9")},(error,task)=>{
    
//     console.log(task)
// })

// db.collection('task').find({'completed':false}).toArray((error,tasks)=>{
//     console.log(tasks)
// })



    
    // db.collection('users').insertOne({
    //     _id:id,
    //     name:'Abhishek',
    //     age: 27
    //    },(error, result)=>{
    //     if(error){
    //         return console.log('Unable to insert user')
    //     }
    // console.log(result.ops)
    //    })
      

// db.collection('users').insertMany([
//     {
// name:"jen",
// age:28
//     },{
//         name:'Gunther',
//         age:27
//     }
// ],(error,result)=>{
// if(error){
//     return console.log('Unable to insert document')
// }
// console.log(result.ops)
// })
// db.collection('task').insertMany([
//     {
//         description: "read",
//         completed:true
//     },
//     {
//         description: "read",
//         completed:false
//     },
//     {
//         description:"modify",
//         completed:false
//     }
// ],(error,result)=>{
//     if(error){
//         return console.log("unable")
//     }
//     console.log(result.ops)
// })




}
 
getData()

