import type { Locator, Page } from "playwright";


export default class RadiologyPage {
 readonly page: Page;
 private radiologyModule: Locator;
 private listRequestSubModule: Locator;
 private fromDate: Locator;
 private okButton: Locator;
 private addReportButton: Locator;
 private closeModalButton: Locator;
 constructor(page: Page) {
   this.page = page;
   this.radiologyModule = page.locator('//a[@href="#/Radiology"]');
   this.listRequestSubModule = page.locator('(//a[@href="#/Radiology/ImagingRequisitionList"])[2]');
   this.fromDate = page.locator('(//input[@id="date"])[1]');
   this.okButton = page.locator('//button[@class="btn green btn-success"]');
   this.addReportButton = page.locator('//a[contains(text(),"Add Report")]').first();
   this.closeModalButton = page.locator('//a[@title="Cancel"]');


 }
 /**
  * @Test6.1 This method performs a radiology request and handles alerts that may arise during the process.
  *
  * @description This method navigates through the Radiology module, applies a date filter,
  *              attempts to add a report, and handles any resulting alert dialogs.
  *              It loops through the process twice to ensure the requests are handled.
  */
 async performRadiologyRequestAndHandleAlert() {
   // write your logic here


   await this.radiologyModule.click();
   await this.listRequestSubModule.click();
   await this.page.waitForLoadState("networkidle");
   for (let i = 0; i < 2; i++) {
     await this.fromDate.fill("2020-01-01"); // Standard far-back date to ensure records appear
     await this.okButton.click();
     await this.page.waitForLoadState("networkidle");
     await this.page.waitForTimeout(3000);
     const isAlertSetup = await this.handleAlert();
     if (await this.addReportButton.isVisible()) {
       await this.addReportButton.click();
       await this.page.waitForTimeout(3000);
       if (await this.closeModalButton.isVisible()) {


         await this.closeModalButton.click();
         await this.page.waitForTimeout(3000);
       }
     }
   }
 }


 /**
  * @Test6.2 This method handles alert dialogs that may appear during radiology requests.
  *
  * @description Listens for dialog events on the page. If the alert matches the expected
  *              message, it accepts the dialog; otherwise, it dismisses it.
  *
  * @return boolean - Returns true if the alert handling was successful.
  */
 async handleAlert(): Promise<boolean> {
   // write your logic here
   try {


     this.page.once("dialog", async (dialog) => {
       const dialogMessage = dialog.message();


       if (dialogMessage.startsWith("Add report") || dialogMessage.toLowerCase().includes("success") || dialogMessage.includes("Changes will be discarded. Do you want to close anyway?")) {
         await dialog.accept();
       } else {
         await dialog.dismiss();
       }
     });
     return true;
   } catch (error) {
     return false;
   }


 }
}





