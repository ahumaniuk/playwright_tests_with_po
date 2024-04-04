const {test, expect } = require('playwright/test')

//import { test, expect } from '@playwright/test';

test.describe('Test Suite1', () => {
  let page;

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test and perform login
  await page.goto('');
  await page.locator("#user-name").click();
  await page.locator("#user-name").fill('standard_user');
  await page.locator("#password").click();
  await page.locator("#password").fill('secret_sauce');
  await page.locator("#login-button").click();
});

test.afterEach(async ({page}) =>{
  await page.close();
});

test('ID=1; Verify sorting ASC ', async ({ page }) => {
  //await page.locator(".product_sort_container").click();
  await page.locator("select.product_sort_container").click();
  await page.locator('.select_container option[value="za"]').click();

  
  
  //await page.locator(".inventory_item_name").textContent();
  const inventoryItemsNames = await page.$$('.inventory_item_name');
  const arrayOfNames = await Promise.all(inventoryItemsNames.map(async (element) => {
    return await element.textContent();
  }));
  //performSorting('az')
  arrayOfNames.then(data => {
    data.sort((a, b) => a.name.localeCompare(b.name));
    console.log(data);

})
});
})