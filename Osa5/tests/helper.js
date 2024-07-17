const { test, expect, beforeEach, describe } = require('@playwright/test')

const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
    
  }

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    
    await page.getByTestId('title').waitFor()
    await page.getByTestId('title').fill(title)
    
    await page.getByTestId('author').waitFor()
    await page.getByTestId('author').fill(author)
    
    await page.getByTestId('url').waitFor()
    await page.getByTestId('url').fill(url)
    
    await page.getByRole('button', { name: 'create' }).click()
    
    await expect(page.getByText(`a new blog ${title} by ${author} added`)).toBeVisible()
}
  


export { loginWith, createBlog }