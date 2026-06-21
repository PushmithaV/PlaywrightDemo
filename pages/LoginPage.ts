import type { Locator, Page } from "@playwright/test";
import fs from "fs";
// import path from 'path';


// const dataPath = path.resolve(__dirname, '../Data/loginData.json');
let credentials: { ValidLogin: { ValidUserName: string; ValidPassword: string } };


try {
 const rawData = fs.readFileSync('./src/Data/loginData.json', 'utf-8');
 credentials = JSON.parse(rawData);
} catch (error) {
 throw new Error(`Failed to load credentials.json: ${(error as Error).message}`);
}


export class LoginPage {
 readonly page: Page;
 private usernameInput: Locator;
 private passwordInput: Locator;
 private loginButton: Locator;
 private loginErrorMessage: Locator;
 private admin: Locator;
 private logOut: Locator;


 constructor(page: Page) {
   this.page = page;
   this.usernameInput = page.locator(`//input[@name="Username"]`);
   this.passwordInput = page.locator(`//input[@name="password"]`);
   this.loginButton = page.locator(`//button[@id="login"]`);
   this.loginErrorMessage = page.locator(`//div[@class="alert alert-danger reduce-padding"]`);
   this.admin = page.locator('//span[@class=username username-hide-on-mobile"]');
   this.logOut = page.locator('//a[.=" Log Out "]');
 }


 /**
  * @Test0 This method logs in the user with valid credentials.
  *
  * @description This method performs the login operation using the provided valid credentials. It highlights the input
  *              fields for better visibility during interaction and fills the username and password fields. After submitting
  *              the login form by clicking the login button, it validates the success of the login process. The login is
  *              considered successful if there are no errors.
  */
 async performLogin() {
   // write your logic here
      await this.usernameInput.fill(credentials.ValidLogin.ValidUserName);
     await this.passwordInput.fill(credentials.ValidLogin.ValidPassword);
     await this.loginButton.click();




 }
}





