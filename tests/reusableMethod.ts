import type { Locator } from "@playwright/test";

export class PatientSearchHelper {
  static async highlightElement(locator: Locator) {
    await locator.evaluate((el) => {
      el.style.border = "2px solid red";
      el.style.backgroundColor = "yellow";
    });
  }
}