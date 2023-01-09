import { test, expect, request } from '@playwright/test';
import { App } from './pages/app';
import { ApiUtils } from './utils/apiUtils';
import { testData } from './utils/dataset';

test.describe('API Sign Up', () => {
    test('Create User From API', async({page}) => {
        const apiContext = await request.newContext()
        const app = new App(page)
        const apiUtils = new ApiUtils(apiContext)
        const createNewUser = await apiUtils.createUser(`${testData.appUrl}/${testData.signUpApiUrl}`, testData.email)
        console.log(createNewUser.email)

        await app.loginPage.loginToTheApp(createNewUser.email, testData.pass)
    })

    test('Login user from API', async({page}) => {
        const apiContext = await request.newContext()
        const apiUtils = new ApiUtils(apiContext)
        const createNewUser = await apiUtils.createUser(`${testData.appUrl}/${testData.signUpApiUrl}`, testData.email)
        const loginUser = await apiUtils.loginUser(`${testData.appUrl}/${testData.loginApiUrl}`, createNewUser.email)
        //set cookie
        page.addInitScript(value => {
            window.localStorage.setItem('token', value)
        }, loginUser.token);

        await page.goto('https://rahulshettyacademy.com/client/')
    })
})
