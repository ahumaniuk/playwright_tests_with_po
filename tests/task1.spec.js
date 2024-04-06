const { expect } = require('playwright/test')






const { test } = require('...src\fixture.js');


//import { test, expect } from '@playwright/test';

test.describe('Test Suite1', () => {

test.beforeEach(async ({ loginPage }) => {
  // Go to the starting url before each test and perform login
  /*
  await page.goto('');
  await page.locator("#user-name").click();
  await page.locator("#user-name").fill('standard_user');
  await page.locator("#password").click();
  await page.locator("#password").fill('secret_sauce');
  await page.locator("#login-button").click();
  */
  await loginPage.navigate();
  await loginPage.performLogin('standard_user', 'secret_sauce');


});

test.afterEach(async ({page}) =>{
  await page.close();
});

test('ID=1; Verify sorting ASC ', async ({ page }) => {
  await page.locator('select.product_sort_container').selectOption('Name (Z to A)');

const inventoryItemNames = await page.$$eval('.inventory_item_name', elements =>
    elements.map(element => element.textContent.trim())
  );

const sortedInventoryItemNames = inventoryItemNames.slice().sort((a, b) => {
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
});
  
const isSortedDesc = JSON.stringify(sortedInventoryItemNames) === JSON.stringify(inventoryItemNames.slice().sort().reverse());
expect(isSortedDesc).toEqual(true)
expect(isSortedDesc).toBeTruthy()
  
});
})