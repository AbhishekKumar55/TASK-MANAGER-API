const request=require('supertest')
const app=require('../src/app')
const User=require('../src/models/user')
const{userOneId,userOne,setupDatabase}=require('./fixtures/db')


beforeEach(setupDatabase)

test('Should signup a new user',async()=>{
    const response=await request(app).post('/users').send({
        name:'Mike',
        email:'mike@example.com',
        password:'Mypass77'
    }).expect(201)

   // Assert that the database was changed correctly
   const user=await User.findById(response.body.user._id)
   expect(user).not.toBeNull()

//Assertions about response
expect(response.body).toMatchObject({
user:{
    name:'Mike',
    email:'mike@example.com'
},
token: user.tokens[0].token
})
expect(user.password).not.toBe('MyPass777!')
})


test('should login existing user',async()=>{
   const response= await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)

    const user=await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user',async()=>{
    await request(app).post('/users/login').send({
        email:userOne.email,
    password:"thisis"
    }).expect(400)
})

test('Should get profile for user',async()=>{
    await request(app)
    .get('/users/me')
    .set('authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get profile for unauthenticate user',async()=>{
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete for authenic user',async()=>{
    await request(app)
    .delete('/users/me')
    .set('authorization',`Bearer ${userOne.tokens[0].token}`)
    .expect(200)
    const user=await User.findById(userOneId)
    expect(user).toBeNull()

    await request(app)
    .delete('/users/me')
    .expect(401)
})

test('Should upload avatar image',async()=>{
    await request(app)
    .post('/users/me/avatar')
    .set('authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','test/fixtures/profile-pic.jpg')
    .expect(200)
    const user=await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields',async()=>{
    await request(app)
    .patch('/users/me')
    .set('authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        name:'Jess'
    }).expect(200)
    const user=await User.findById(userOneId)
    expect(user.name).toEqual('Jess')
})

test('Should  not update invalid user fields',async()=>{
    await request(app)
    .patch('/users/me')
    .set('authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        location:'Phildelphia'
    }).expect(400)
})