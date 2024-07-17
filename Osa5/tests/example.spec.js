const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')



describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen2',
        username: 'mluukkai2',
        password: 'salainen2'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    expect(page.getByRole('button', { name: 'login' })).toBeVisible
    expect(page.getByRole('textbox')).toHaveCount(2)

  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen') 
    await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()    
    })

    test('fails with wrong credentials', async ({ page }) => {
      loginWith(page, 'mluukkai', 'lol') 
      await expect(page.getByText('wrong username or password')).toBeVisible()


    })
  })

describe('When logged in', () => {
  beforeEach(async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen') 
  })

  test('a new blog can be created', async ({ page }) => {
    await createBlog(page, 'moi1', 'hei1', 'moihei1.as')

    await expect(page.getByText('a new blog moi1 by hei1 added')).toBeVisible()
  })  
  test('a blog can be liked', async ({ page }) => {

    await createBlog(page, 'moi', 'hei', 'moihei.as')

    await expect(page.getByText('a new blog moi by hei added')).toBeVisible()

    await page.getByRole('button', {name: 'view'}).click()

    await page.getByRole('button', {name: 'like'}).click()

    await page.getByText('1like').waitFor()

    await expect(page.getByText(1, { exact: true })).toBeVisible()
  })
  test('user that added the blog can also delete it', async({ page }) => {
    await createBlog(page, 'moi', 'hei', 'moihei.as')
    await page.getByRole('button', {name: 'view'}).click()

    page.on('dialog', async dialog => await dialog.accept())
    
    await page.getByRole('button', {name: 'REMOVE >:D'}).click()
    await page.getByText('blog moi has been deleted :D').waitFor()
    await expect(page.getByText('blog moi has been deleted :D')).toBeVisible()
  })
  
  test('only the user who added blog can see delete button', async({ page }) => {
    await createBlog(page, 'moi2', 'hei2', 'moihei.as')
    await page.getByRole('button', {name: 'view'}).click()
    await expect(page.getByRole('button', {name: 'REMOVE >:D'})).toBeVisible()

    await page.getByRole('button', {name: 'logout'}).click()
    await loginWith(page, 'mluukkai2', 'salainen2')
    await page.getByRole('button', {name: 'view'}).click()

    await expect(page.getByRole('button', {name: 'REMOVE >:D'})).toHaveCount(0)

  })

  test('test blogs are sorted correctly by likes ', async({ page }) => {
    await createBlog(page, '1moi', 'hei', 'moihei.as')
    await createBlog(page, '2moi', 'hei2', 'moihei.as')
    await createBlog(page, '3moi', 'hei3', 'moihei.as')
  
    await page.getByText('1moi').getByRole('button', { name: 'view' }).click()
    await page.getByRole('button', { name: 'like' }).click()
    await page.getByText('1like').waitFor()
    
    await page.getByRole('button', { name: 'like' }).click()
    await page.getByText('2like').waitFor()
    
    await page.getByRole('button', { name: 'hide' }).click()
    await page.getByText('1moi').getByRole('button', { name: 'view' }).waitFor()
    
    
    await page.getByText('3moi').getByRole('button', { name: 'view' }).click()
    await page.getByRole('button', { name: 'like' }).click()
    await page.getByText('1like').waitFor()
  
    await page.getByRole('button', { name: 'like' }).click()
    await page.getByText('2like').nth(1).waitFor()
    
    await page.getByRole('button', { name: 'like' }).click()
    await page.getByText('3like').waitFor()
    
    await page.getByRole('button', { name: 'hide' }).click()
    await page.getByText('3moi').getByRole('button').waitFor()



    expect(page.locator('.partialView').nth(0)).toContainText('3moi hei3view')
    expect(page.locator('.partialView').nth(1)).toContainText('1moi heiview')



  })



})
})
