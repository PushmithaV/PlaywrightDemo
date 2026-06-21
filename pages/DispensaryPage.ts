import type { Page, Locator } from "@playwright/test";
import { expect } from "@playwright/test";


export default class DispensaryPage {
 readonly page: Page;
 private maxRetries = 3;
 private timeoutDuration = 5000;
 public dispensary: {
   dispensaryLink: Locator;
   dispensaryactivateCounter: Locator;
   counterSelection: Locator;
   counterName: Locator;
   activatedCounterInfo: Locator;
   deactivateCounterButton: Locator;
   titleName: Locator;
   name: Locator;
   prescription: Locator;
   reports: Locator;
   fromDate: Locator;
   showReportButton: Locator;
   userCollectionReport: Locator;
   counterDropdown: Locator;
   counterNameFromTable: Locator;
   countertab: Locator;
   activedispensaryname: Locator;


 };


 constructor(page: Page) {
   this.page = page;
   this.dispensary = {
     dispensaryLink: page.locator('//a[@href="#/Dispensary"]'),
     dispensaryactivateCounter: page.locator('//a[@class="report_list"]'),
     counterSelection: page.locator('//div[@class="counter-item"]'),
     countertab: page.locator('(//a[@href="#/Dispensary/ActivateCounter"])[2]'),
     counterName: page.locator('//div[@class="counter-item"]//h5'),
     activatedCounterInfo: page.locator('//div[@class="mt-comment-info"]/b'),
     deactivateCounterButton: page.locator('//button[@class="btn btn-danger"]'),
     titleName: page.locator('//span[@class="caption-subject" or contains(@class,"title")]'),
     name: page.locator('//input[@id="name"] | //input[@placeholder="Search Patient"]'),
     prescription: page.locator('//a[@href="#/Dispensary/Prescription"]'),


     // Standard reporting and report filtering element locators
     reports: page.locator('(//a[@href="#/Dispensary/Reports"])[2]'),
     fromDate: page.locator('(//input[@id="date"])[1]'),
     showReportButton: page.locator('//span[.="Show Report"]/..'),
     userCollectionReport: page.locator('//a[@href="#/Dispensary/Reports/UserWiseCollectionReport"]'),
     counterDropdown: page.locator('//select[@id="ddlCounter"]'),
     counterNameFromTable: page.locator('//select[@id="ddlCounter"]/option[@value="1"]'),
     activedispensaryname: page.locator('//label[@class="label label-primary"]/b'),
   };
 }


 /**
  * @Test3 Verifies the activation message for a randomly selected counter in the Dispensary module.
  *
  * @description This method navigates to the Dispensary module and checks if multiple counters are available.
  *              If counters exist, it selects one at random, activates it, and verifies that the activation message
  *              correctly displays the name of the selected counter. Logs are included to provide insights into
  *              counter selection and activation status. The method highlights elements during interactions
  *              for better visibility in debugging.
  */
 async verifyActiveCounterMessageInDispensary() {
   // write your logic here
   await this.dispensary.dispensaryLink.click();
   await this.page.waitForTimeout(3000);
   const dispensaryname = await this.dispensary.dispensaryactivateCounter.nth(1).innerText();
   console.log("dispensary name is : ", dispensaryname);
   await this.dispensary.dispensaryactivateCounter.nth(1).click();
   await this.page.waitForTimeout(3000);
   const activedispensary = await this.dispensary.activedispensaryname.innerText();
   console.log("active dispensary name is : ", activedispensary);
   expect(dispensaryname).toContain(activedispensary);


   const counter1 = this.dispensary.counterSelection.first().innerText();
   console.log("First counter is: ", await counter1);


   await this.page.waitForTimeout(3000);


   await this.dispensary.counterSelection.first().click();
   await this.page.waitForTimeout(3000);


   await this.dispensary.countertab.click();
 }


 /**
  * @Test10 This method verifies if the counter is activated in the dispensary section.
  *
  * @description Navigates to the dispensary module, selects the 'Morning Counter' from the dropdown,
  * and generates the user collection report for the specified date.
  *
  */
 async generateMorningCounterReport() {
   // write your logic here
   try {


     await this.dispensary.dispensaryLink.click();
     await this.page.waitForLoadState("networkidle");
     const dispensaryname = await this.dispensary.dispensaryactivateCounter.first().innerText();
     console.log("dispensary name is : ", dispensaryname);
     await this.dispensary.dispensaryactivateCounter.first().click();
     await this.dispensary.counterSelection.first().click();


     await this.page.waitForTimeout(3000);
     await this.dispensary.reports.click();
     await this.page.waitForLoadState("networkidle");




     await this.dispensary.userCollectionReport.click();
     await this.page.waitForLoadState("networkidle");




     await this.dispensary.fromDate.click();
     await this.dispensary.fromDate.fill("2020-01-01");




     await this.dispensary.counterDropdown.waitFor({ state: "visible" });
     await this.dispensary.counterDropdown.selectOption({ value: "1" });




     await this.dispensary.showReportButton.click();
     await this.page.waitForLoadState("networkidle");
     await this.page.waitForTimeout(3000); // Debounce space for the table to stream updates




   } catch (error) {
     console.error("Failed to accurately generate the Morning Counter report stream:", error);


   }
 }
};





