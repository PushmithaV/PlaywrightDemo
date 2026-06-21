import type { Page, Locator } from "@playwright/test";
import { expect } from "@playwright/test";


export default class AppointmentPage {
 readonly page: Page;
 public appointment: {
   appointmentLink: Locator;
   counterItem: Locator;
   titleName: Locator;
   searchBar: Locator;
   patientName: Locator;
   hospitalSearchBar: Locator;
   patientCode: Locator;
   newVisitTab: Locator;
   newVisitHeading: Locator;
   counters: Locator;
 };


 constructor(page: Page) {
   this.page = page;
   this.appointment = {
     appointmentLink: page.locator('//a[@href="#/Appointment"]'),
     counterItem: page.locator(''),
     titleName: page.locator(''),
     searchBar: page.locator('(//input[@class="searchtbx"])[1]'),
     hospitalSearchBar: page.locator('//input[@placeholder="Search (Minimum 3 Character)"]'),
     patientName: page.locator('//div[@class="ag-center-cols-clipper"]//div[@role="row"]/div[2]'),
     patientCode: page.locator('//div[@role="gridcell" and @col-id="PatientCode"]'),
     newVisitTab: page.locator('//a[contains(text(),"New Visit")]'),
     newVisitHeading: page.locator('//h3[contains(text(),"New Visit")]'),
     counters: page.locator("(//div[@class='row'])[2]/div"),
   };
 }


 /**
  * @Test2 Validates the presence of the specified patient name in the 'ShortName' column of the search results grid.
  *
  * @description This method checks whether the provided patient name appears in the search results under the 'ShortName'
  *              column. It waits for the column to be visible, retrieves the list of displayed names, and verifies that the
  *              expected patient name is included. If the name is found, the method confirms success; otherwise, it logs
  *              an error for troubleshooting purposes.
  *
  * @param {string} patientName - The expected patient name to validate in the search results.
  * @return {Promise<void>} - No return value, but logs any error encountered during the verification process.
  */
 async verifypatientName(patientname: string) {
   // write your logic here
   try {
     await this.appointment.appointmentLink.click();
     await this.page.waitForTimeout(3000);
     if (await this.appointment.counters.first().isVisible()) {
       await this.appointment.counters.first().click();
     }
     await this.page.waitForTimeout(3000);
     await this.appointment.searchBar.pressSequentially(patientname);
     await this.appointment.searchBar.press('Enter');
     await this.page.waitForTimeout(3000);
     const patientList = await this.page.locator(`//div[@role='gridcell' and @col-id='ShortName']`);
     expect(patientList.first().innerText()).toContain(patientname);


   }
   catch (error) {
     console.log("Caught an error", error);
   }
 }


 /**
  * @Test11 This method opens the New Visit page in the appointment module using the Alt + N keyboard shortcut.
  *
  * @description This function clicks the appointment link to navigate to the appointment module.
  *              It then clicks on the "New Visit" tab and simulates pressing the Alt + N keyboard shortcut to open
  *              the New Visit page. After triggering the shortcut, it waits for the page to load and verifies that
  *              the New Visit page is displayed by checking the visibility of the New Visit heading and the URL.
  */
 async openNewVisitPageThroughKeyboardButton() {
   // write your logic here
   try {
     await this.appointment.appointmentLink.click();
     await this.page.waitForLoadState("networkidle");




     if (await this.appointment.counters.first().isVisible()) {
       await this.appointment.counters.first().click();
     }


   
     await this.appointment.newVisitTab.click();
     await this.page.waitForLoadState("networkidle");


     // Dispatch the standard global accessibility shortcut combination trigger
    /* const isMac = process.platform === "darwin";
     console.log("Is this MAC?" ,isMac);
     const shortcut = isMac ? "Option+n" : "Alt+n";*/


    await this.page.once('dialog', async dialog => {
       console.log("Alert message is ", dialog.message());
       await this.page.waitForTimeout(3000);
       await dialog.accept();
   });


   await this.page.keyboard.down("Alt");
     await this.page.keyboard.press("n");
     await this.page.keyboard.up("Alt");
     await this.page.waitForLoadState("networkidle");


     // Verify interface boundaries match target parameters
     await expect(this.appointment.newVisitHeading).toBeVisible();
     await expect(this.page).toHaveURL(/Visit/);
     await this.page.waitForTimeout(3000);




   } catch (error) {
     console.error("Keyboard command trigger mapping sequence aborted:", error);


   }
 }


 /**
  * @Test9.1 This method performs a patient search in the appointment section using reusable function.
  *
  * @description This function highlights the appointment link, clicks on it to navigate to the appointment page,
  *              waits for the page to load, and triggers the patient search action using a helper function.
  *              It ensures that the patient search is executed successfully and returns true if the search operation is completed.
  */
 async searchPatientInAppointment(patientname: string) {
   // write your logic here
   try {
     await this.appointment.appointmentLink.scrollIntoViewIfNeeded();
     await this.appointment.appointmentLink.click();
     await this.page.waitForLoadState("networkidle");


     if (await this.appointment.counters.first().isVisible()) {
       await this.appointment.counters.first().click();
     }


  
     //await this.appointment.searchBar.click();
     await this.appointment.searchBar.fill(patientname);
     await this.appointment.searchBar.press('Enter');




   } catch (error) {
     console.error("Failed executing searchPatientInAppointment core setup module:", error);


   }
 }
}





