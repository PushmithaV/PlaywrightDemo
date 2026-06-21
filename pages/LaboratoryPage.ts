import type { Page, Locator } from "playwright";
import { expect } from "@playwright/test";


export default class LaboratoryPage {
 private page: Page;
 private laboratoryLink: Locator;
 private laboratoryDashboard: Locator;
 private settingsSubModule: Locator;
 private addNewLabTest: Locator;
 private addButton: Locator;
 private closeButton: Locator;
 private starIcon: Locator;
 private errorMessageLocator: Locator;


 constructor(page: Page) {
   this.page = page;
   this.laboratoryLink = page.locator('//a[@href="#/Lab"]');
   this.laboratoryDashboard = page.locator('//a[@href="#/Lab/Dashboard"]');
   this.settingsSubModule = page.locator('(//a[@href="#/Lab/Settings"])[2]');
   this.addNewLabTest = page.locator('//a[@class="btn blue bordered btn-sm primary-btn"]');
   this.addButton = page.locator('//button[contains(.,"Add")]');
   this.closeButton = page.locator('//button[contains(.,"Close")]');
    this.starIcon = page.locator('//i[@title="Remember this Date"]');
   this.errorMessageLocator = page.locator('//div[@class="danphe-msgbox msgbox-error ng-star-inserted"]');
 }


 /**
  * @Test5 This method verifies the error message when attempting to add a new lab test without entering required values.
  *
  * @description Navigates to Laboratory > Settings, selects "Add New Lab Test," and clicks the Add button without
  *              providing any input. Captures and returns the displayed error message.
  * @Note Do not close "Add Lab Test" Modal
  */
 async verifyErrorMessage() {
   // write your logic here
   await this.laboratoryLink.click();
   await this.settingsSubModule.click();
   await this.addNewLabTest.click();
    await this.page.waitForTimeout(2000);
   await this.addButton.click();
   const allerrormsg = this.errorMessageLocator.allInnerTexts();
   await this.page.waitForTimeout(2000);
   console.log("Error message is: ",await allerrormsg);
 }


 /**
  * @Test12 This method verifies the tooltip text of the star icon in the laboratory dashboard.
  *
  * @description This function navigates to the laboratory page and dashboard, hovers over the star icon, and
  *              waits for the tooltip to appear. It verifies the visibility of the star icon and retrieves the tooltip
  *              text.
  */
 async verifyStarTooltip() {
   // write your logic here
   try {
      await this.laboratoryLink.click();
     await this.laboratoryDashboard.click();
     await this.page.waitForLoadState("networkidle");
     await this.page.waitForTimeout(3000);


     await this.starIcon.waitFor({ state: "visible" });
     await expect(this.starIcon).toBeVisible();
     await this.starIcon.first().scrollIntoViewIfNeeded();


    
     await this.starIcon.hover();
     await this.page.waitForTimeout(1000);


 
     let tooltipText = await this.starIcon.getAttribute("title");


     // If the tooltip is rendered using dynamic custom DOM nodes instead of structural title tags:
    /* if (!tooltipText) {
       const dynamicTooltip = this.page.locator('//div[contains(@class, "tooltip")] | //span[contains(@class, "tooltiptext")]');
       if (await dynamicTooltip.isVisible()) {
         tooltipText = await dynamicTooltip.innerText();
       }
     }*/


     console.log(`Extracted dashboard star tooltip string text: "${tooltipText}"`);
    
   } catch (error) {
     console.error("Failed executing hover action inside verifyStarTooltip sequence:", error);
    
   }
 }
 }







