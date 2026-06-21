import type { Page, Locator } from "@playwright/test";
import { expect } from "@playwright/test";


export default class UtilitiesPage {
 readonly page: Page;
 public utilities: {
   utilitiesModule: Locator;
   ChangeBillingCounter: Locator;
   counters: Locator;
   counterItem: Locator;
 };


 constructor(page: Page) {
   this.page = page;
   this.utilities = {
     utilitiesModule: page.locator('//a[@href="#/Utilities"]'),
     ChangeBillingCounter: page.locator('(//a[@href="#/Utilities/ChangeBillingCounter"])[2]'),
     counters: page.locator("(//div[@class='row'])[2]/div"),
     counterItem: page.locator(""),
   };
 }


 /**
* @Test1 This method verifies the load time and selection of a billing counter.
*
* @description Navigates to the Utilities module, opens the Change Billing Counter modal,
*              and measures the load time of the modal. If the modal loads within an acceptable
*              time limit, the method selects the first available billing counter. If no counters
*              are available, it logs a message. The function handles errors gracefully and logs
*              any exceptions encountered.
*/
 async verifyBillingCounterLoadState() {
   // write your logic here


   const SLA_LIMIT_MS = 5000;
   try {
     await this.utilities.utilitiesModule.click();
     const startTime = performance.now();
     const billingmodel = this.utilities.ChangeBillingCounter;


     await billingmodel.click();
     await billingmodel.waitFor({ state: 'visible', timeout: 5000 });


     const endTime = performance.now();
     const loadTime = endTime - startTime;
     console.log(`Billing Counter modal loaded in ${loadTime.toFixed(2)}ms`);
     await expect(loadTime).toBeLessThan(SLA_LIMIT_MS);
     const counters = this.utilities.counters;
     const counter_count = await counters.count();
     if (counter_count > 0) {
       await counters.first().click();
     }
   }
   catch (error) {
     console.error('An exception was encountered during the Billing Counter test:', error);
     throw error; //
   }


 }
}





