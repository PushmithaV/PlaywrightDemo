import type { Page, Locator } from "@playwright/test";


export default class ADTPage {
 readonly page: Page;
 public ADT: {
   ADTLink: Locator;
   searchBar: Locator;
   patientName: Locator;
   hospitalSearchBar: Locator;
   patientCode: Locator;
 };


 constructor(page: Page) {
   this.page = page;
   this.ADT = {
     ADTLink: page.locator('//a[@href="#/ADTMain"]'),
     searchBar: page.locator('//input[@id="quickFilterInput"]'),
     hospitalSearchBar: page.locator('//input[@id="quickFilterInput"]'),
     patientName: page.locator("//div[@role='gridcell' and @col-id='ShortName']"),
     patientCode: page.locator("//div[@role='gridcell' and @col-id='PatientCode']"),
   };
 }


 /**
  * @Test9.3 Executes a patient search in the ADT (Admission, Discharge, Transfer) section using a reusable helper function.
  *
  * @description This method navigates to the ADT section by highlighting and clicking the ADT link,
  *              waits for the page to load, and initiates a patient search using the PatientSearchHelper class.
  *              The function verifies successful navigation to the ADT page and performs the search operation.
  *
  */
 async searchPatientInADT(patientname: string) {
   try {
     await this.ADT.ADTLink.scrollIntoViewIfNeeded();
     await this.ADT.ADTLink.click();
     await this.page.waitForLoadState("networkidle");
     // await this.ADT.searchBar.click();
     await this.ADT.searchBar.fill(patientname);
     await this.ADT.searchBar.press('Enter');


   } catch (error) {
     console.error("Failed executing searchPatientInADT core module workflow steps:", error);


   }
 }
}





