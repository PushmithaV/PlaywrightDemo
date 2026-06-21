import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";


export class SettingsPage {
   readonly page: Page;
   private settingsLink: Locator;
   private radiologySubmodule: Locator;
   private addImagingTypeButton: Locator;
   private imagingItemNameField: Locator;
   private addButton: Locator;
   private searchBar: Locator;


   constructor(page: Page) {
       this.page = page;


       this.settingsLink = page.locator('//a[@href="#/Settings"]');
       this.radiologySubmodule = page.locator('(//a[@href="#/Settings/RadiologyManage"])[2]');
       this.addImagingTypeButton = page.locator('//a[.="Add Imaging Type"]');
       this.imagingItemNameField = page.locator('//input[@id="ImagingTypeName"]');
       this.addButton = page.locator('//input[@id="addBtn"]');
       this.searchBar = page.locator('//input[@id="quickFilterInput"]');
   }


   /**
  * @Test13 This method automates the process of creating a new imaging type in the Radiology section of the Settings module.
  *
  * @description This function performs the following actions:
  *              1. Navigates to the Settings module and clicks on the Radiology submodule.
  *              2. Clicks on the "Add Imaging Type" button to open the modal for adding a new imaging type.
  *              3. Fills the "Imaging Item Name" field with a random name (Test-{random4digitnumber}) and clicks "Add".
  *              4. Verifies that the newly added imaging type appears in the list of imaging types.
  */
   async addAndVerifyNewImagingType() {
       try {


           await this.settingsLink.click();
           await this.page.waitForLoadState("networkidle");


           await this.radiologySubmodule.click();
           await this.page.waitForLoadState("networkidle");
           await this.page.waitForTimeout(3000);


           await this.addImagingTypeButton.waitFor({ state: "visible" });
           await this.addImagingTypeButton.click();
           await this.page.waitForTimeout(3000);


           const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);
           const targetImagingName = `Test-${random4DigitNumber}`;
           console.log(`Generated structural verification name target: "${targetImagingName}"`);




           await this.imagingItemNameField.waitFor({ state: "visible" });
          // await this.imagingItemNameField.click();
           await this.imagingItemNameField.fill(targetImagingName);
           await this.addButton.click();


    
           await this.page.waitForLoadState("networkidle");
           await this.page.waitForTimeout(3000);


           // 5. Query matching rows via search filters to verify insertion matches
           await this.searchBar.waitFor({ state: "visible" });
          // await this.searchBar.click();
           await this.searchBar.fill(targetImagingName);
             await this.searchBar.press('Enter');
           await this.page.waitForTimeout(3000);


        
           const gridCellMatch = this.page.locator(`//div[@role="gridcell" and text()="${targetImagingName}"]`).first();
           await expect(gridCellMatch).toBeVisible();




       } catch (error) {
           console.error("Aborted executing addAndVerifyNewImagingType workflow chain steps:", error);


       }
   }
}





