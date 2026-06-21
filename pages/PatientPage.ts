import type { Page, Locator } from "@playwright/test";


export default class PatientPage {
 readonly page: Page;
 public patient: {
   patientLink: Locator;
   searchBar: Locator;
   patientName: Locator;
   hospitalSearchBar: Locator;
   patientCode: Locator;
 };


 constructor(page: Page) {
   this.page = page;
   this.patient = {
     patientLink: page.locator('//a[@href="#/Patient"]'),
     searchBar: page.locator('//input[@id="quickFilterInput"]'),
     hospitalSearchBar: page.locator('//input[@id="quickFilterInput"]'),
     patientName: page.locator("//div[@role='gridcell' and @col-id='ShortName']"),
     patientCode: page.locator(""),
   };
 }


 /**
  * @Test9.2 This method performs a patient search in the appointment section using reusable function.
  *
  * @description This function highlights the appointment link, clicks on it to navigate to the appointment page,
  *              waits for the page to load, and triggers the patient search action using a helper function.
  *              It ensures that the patient search is executed successfully and returns true if the search operation is completed.
  */
 async searchPatientInPatientPage(patientname: string) {
   // write your logic here
   try {
     await this.patient.patientLink.scrollIntoViewIfNeeded();
     await this.patient.patientLink.click();
     await this.page.waitForLoadState("networkidle");
     // await this.patient.searchBar.click();
     await this.patient.searchBar.fill(patientname);
     await this.patient.searchBar.press('Enter');


   } catch (error) {
     console.error("Failed executing searchPatientInPatientPage workflow:", error);


   }
 }


 /**
  * @Test7 Searches for and verifies patients in the patient list.
  *
  * @description This method navigates to the patient section, iterates over a predefined list of patients, and performs
  *              a search operation for each patient name. After each search, it verifies that the search result matches
  *              the expected patient name. If all patients are verified successfully, it returns true; otherwise, false.
  *
  */
 async searchAndVerifyPatients(patientData: string[]) {
   try {


     await this.patient.patientLink.click();
     await this.page.waitForLoadState("networkidle");
     let allPassed = true;
     for (const name of patientData) {
       if (!name) continue;
       //await this.patient.searchBar.click();
       await this.patient.searchBar.fill(name);
       await this.patient.searchBar.press('Enter');
       await this.page.waitForTimeout(3000);
       const firstRowNameElement = this.patient.patientName.first();


       if (await firstRowNameElement.isVisible()) {
         const actualText = await firstRowNameElement.innerText();
         if (!actualText.toLowerCase().includes(name.toLowerCase())) {
           allPassed = false;
           console.warn(`Mismatch detected: Expected "${name}", but found "${actualText}"`);
         }
       } else {
         allPassed = false;
         console.warn(`No grid matching row UI results appeared for: "${name}"`);
       }
     }
   } catch (error) {
     console.error("Error executing loop step validation context inside searchAndVerifyPatients:", error);


   }
 }


}







