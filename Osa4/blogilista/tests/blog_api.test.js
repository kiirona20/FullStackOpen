const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')

const app = require('../app')
const api = supertest(app)



const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})
describe('test db initialization', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 6)
  })

  test('the first Blog title is "React patterns"', async () => {
    const response = await api.get('/api/blogs')

    const title = response.body[0].title
    assert(title.includes('React patterns'))
  })
})

test('blogs should have "id" field', async () =>{
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.every(i=>i.hasOwnProperty('id')), true)
})


test('a valid blog can be added ', async () => {
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

after(async () => {
  await mongoose.connection.close()
})