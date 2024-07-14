const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')

const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')


const helper = require('./test_helper')

const User = require('../models/user')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})
describe.only('test db initialization', () => {
  test.only('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test.only('there are six blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 6)
  })

  test.only('the first Blog title is "React patterns"', async () => {
    const response = await api.get('/api/blogs')

    const title = response.body[0].title
    assert(title.includes('React patterns'))
  })
})

test.only('blogs should have "id" field', async () =>{
  const response = await helper.blogsInDb()
  const checkBlogForId = (blog) => {
    return blog.hasOwnProperty('id')
  }
  assert.strictEqual(response.every(checkBlogForId), true)
})


test.only('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'jotain',
    author: 'jotain',
    url: 'www.w.fi',
    likes: 69
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const blogs = response.body

  assert.strictEqual(blogs.length, helper.initialBlogs.length + 1)
  
  const addedBlog = blogs[response.body.length-1]
  //Deleting id so the blogs content can be compared with newBlog
  delete addedBlog.id
  assert.deepEqual(addedBlog,newBlog)
})

test('if blog doesn`t have property likes, likes equal 0', async () => {
  const newBlog = {
    title: 'jotain',
    author: 'jotain',
    url: 'www.w.fi'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const addedBlog = response.body[response.body.length-1]

  assert.strictEqual(addedBlog.likes, 0)
  
})


test('if blog doesn`t have url or title, status is "400 bad request"', async () => {
  const newBlog = {
    url: 'www.w.fi'
  }
  const newBlog2 = {
    title: 'jotain'
  }
  const newBlog3 = {
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlog2)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlog3)
    .expect(400)

})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  assert(!JSON.stringify(blogsAtEnd).includes(JSON.stringify(blogToDelete)))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('a blog is updated correctly', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
    title: "String",
    author: "some3Author",
    url: "idk3",
    likes: 420,
    id: blogToUpdate.id
  }

  await api
  .put(`/api/blogs/${blogToUpdate.id}`)
  .send(updatedBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert(JSON.stringify(blogsAtEnd).includes(JSON.stringify(updatedBlog)))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails if password too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'asd',
      name: 'Superuser',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('password missing or password length under 3'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
  test('creation fails if username too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'as',
      name: 'Superuser',
      password: 'saaa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('User validation failed'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails if there is no username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Superuser',
      password: 'saaa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('User validation failed'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails if there is no password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'assasaasas',
      name: 'Superuser'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('password missing or password length under 3'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})