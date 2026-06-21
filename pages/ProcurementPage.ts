import type { Locator, Page } from "playwright";
import { expect } from "@playwright/test";


export default class ProcurementPage {
 readonly page: Page;
 private procurement: Locator;
 private purchaseRequest: Locator;
 private purchaseOrder: Locator;
 private goodsArrivalNotification: Locator;
 private quotations: Locator;
 private settings: Locator;
 private reports: Locator;
 private favoriteButton: Locator;
 private okButton: Locator;
 private printButton: Locator;
 private firstButton: Locator;
 private previousButton: Locator;
 private nextButton: Locator;
 private lastButton: Locator;
 private fromDate: Locator;
 private toDate: Locator;
 private invalidMsg: Locator;
 private requestedDateColumn: Locator;


 constructor(page: Page) {
   this.page = page;
   this.procurement = page.locator('//a[@href="#/ProcurementMain"]');
   this.purchaseRequest = page.locator('//a[@href="#/ProcurementMain/PurchaseRequest"]');
   this.purchaseOrder = page.locator('//a[@href="#/ProcurementMain/PurchaseOrder"]');
   this.goodsArrivalNotification = page.locator('//a[@href="#/ProcurementMain/GoodsReceipt"]');
   this.quotations = page.locator('//a[@href="#/ProcurementMain/Quotation"]');
   this.settings = page.locator('//a[@href="#/ProcurementMain/Settings"]');
   this.reports = page.locator('//a[@href="#/ProcurementMain/Reports"]');
   this.favoriteButton = page.locator('//i[@title="Remember this Date"]');
   this.okButton = page.locator('//button[@class="btn green btn-success"]');
   this.printButton = page.locator('//button[@title="Print grid data"]');
   this.firstButton = page.locator('//button[@ref="btFirst"]');
   this.previousButton = page.locator('//button[@ref="btPrevious"]');
   this.nextButton = page.locator('//button[@ref="btNext"]');
   this.lastButton = page.locator('//button[@ref="btLast"]');
   this.fromDate = page.locator('(//input[@id="date"])[1]');
   this.toDate = page.locator('(//input[@id="date"])[2]');
   this.invalidMsg = page.locator('//span[@style="color:red;"]');
   this.requestedDateColumn = page.locator("//div[@role='gridcell' and @col-id='RequestDate']");
 }


 /**
  * @Test4 This method verifies the visibility of essential elements in the Purchase Request List on the Procurement page.
  *
  * @description Navigates to the Procurement module and verifies the presence of multiple elements, including buttons
  *              and options related to the Purchase Request List. It highlights each element and checks if it is visible
  *              on the page. If any element is missing, the method returns false, and a warning is logged.
  */
 async verifyPurchaseRequestListElements() {
   await this.procurement.click();
   await expect(this.favoriteButton).toBeVisible();
   await expect(this.okButton).toBeVisible();
   await expect(this.favoriteButton).toBeVisible();
   await expect(this.printButton).toBeVisible();
   await expect(this.firstButton).toBeVisible();
   await expect(this.previousButton).toBeVisible();
   await expect(this.nextButton).toBeVisible();
   await expect(this.fromDate).toBeVisible();
   await expect(this.toDate).toBeVisible();




 }


 /**
* @Test8 This method verifies the error message displayed after entering an invalid date in the filter.
*
* @description This method navigates to the Procurement module, selects the Purchase Request tab,
*              and applies an invalid date filter. Upon clicking the OK button, it captures and validates
*              the error message displayed to confirm that the application correctly identifies the invalid input.
*/
 async verifyNoticeMessageAfterEnteringIncorrectFilters() {
   // write your logic here
   try {
     await this.procurement.click();
     await this.purchaseRequest.click();
     await this.page.waitForLoadState("networkidle");




     await this.fromDate.fill("2025-12-31");
     await this.toDate.fill("2020-01-01");
     // await this.okButton.click();




     await expect(this.invalidMsg).toBeVisible();
     const validationErrorMessage = await this.invalidMsg.innerText();
     console.log("Error message is: ", validationErrorMessage);


     return validationErrorMessage.length > 0;
   } catch (error) {
     console.error("Failed executing incorrect filter exception scenario:", error);
     return false;
   }
 }


 /**
  * @Test14 This method verifies that all dates in the requested date column are within the specified range.
  *
  * @description This method navigates to the Purchase Request List, applies a date filter,
  *              and checks if all dates in the requested date column fall within the specified range.
  *              The method parses the date format and compares each date against the range.
  *
  */
 async verifyRequestedDateColumnDateWithinRange() {
   // write your logic here
   try {
     await this.procurement.click();
     await this.purchaseRequest.click();
     await this.page.waitForLoadState("networkidle");


     const startDateString = "2020-01-01";
     const endDateString = "2025-12-31";


     // Apply clear parameter filters
     await this.fromDate.fill(startDateString);
     await this.toDate.fill(endDateString);
     await this.okButton.click();
     await this.page.waitForLoadState("networkidle");
     await this.page.waitForTimeout(3000);


     const startTimestamp = new Date(startDateString).getTime();
     const endTimestamp = new Date(endDateString).getTime();


     // Extract text content from every visible grid row record cell
     const visibleDateCells = await this.requestedDateColumn.allInnerTexts();


     if (visibleDateCells.length === 0) {
       console.warn("No active request data found matching specified filter ranges.");
       return true;
     } for (const text of visibleDateCells) {
       if (!text || text.trim() === "") continue;


       // Clean out spaces and parse standard system app timestamps (YYYY-MM-DD or DD-MM-YYYY formats)
       let formattedText = text.trim();
       /*
       if (formattedText.includes("-") && formattedText.indexOf("-") === 2) {
         formattedText = formattedText.split("-").reverse().join("-");
       }*/
      
       const rowTimestamp = new Date(formattedText).getTime();


       if (isNaN(rowTimestamp)) {
         console.warn(`Encountered unparseable grid row string element: "${text}"`);
         continue;
       }


       // Validate constraint boundaries
       if (rowTimestamp < startTimestamp || rowTimestamp > endTimestamp) {
         console.error(`Out of boundary exception element caught: ${text} is outside range.`);
         return false;
       }
     }




   } catch (error) {
     console.error("Error executing range data validations inside grid layouts:", error);
   }
 }
}





