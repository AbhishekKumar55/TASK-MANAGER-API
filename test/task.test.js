const request=require('supertest')
const app= require('../src/app')
const Tasks=require('../src/models/task')
const{
    userOneId,
    userOne,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}=require('./fixtures/db')


beforeEach(setupDatabase)

test('Shoul create task for user',async()=>{
    const response=await request(app)
    .post('/tasks')
    .set('authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        description:'From my test'
    }).expect(202)
    const task=await Tasks.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})
test('Should fetch user tasks',async()=>{
    const response=await request(app)
    .get('/tasks')
    .set('authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    expect(response.body.length).toEqual(2)
})

test('Second user delete the first task',async()=>{
const responce=await request(app)
.delete(`/tasks/${taskOne._id}`)
.set('authorization',`Bearer ${userTwo.tokens[0].token}`)
.send()
.expect(404)
const task= await Tasks.findById(taskOne._id)
expect(task).not.toBeNull()
})

