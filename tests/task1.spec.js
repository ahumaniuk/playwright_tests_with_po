const { expect } = require('playwright/test');
const { test } = require('../src/fixture.js');
const { sortInventoryItemNames } = require('../src/Helper.js');
const { extractTextContent } = require('../src/Helper.js');


test.describe('Test Suite1', () => {

test.beforeEach(async ({ loginPage }) => {
  await loginPage.navigate();
  await loginPage.performLogin('standard_user', 'secret_sauce');
});

test.afterEach(async ({page}) =>{
  await page.close();
});

test('ID=1; Verify sorting DESC ', async ({ page }) => {
  await page.locator('select.product_sort_container').selectOption('Name (Z to A)');

const inventoryItemNames = await extractTextContent(page, '.inventory_item_name', 'element => element.textContent.trim()');

const sortedInventoryItemNames = inventoryItemNames.slice().sort((a, b) => {
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
});
  
expect(sortedInventoryItemNames).toEqual(inventoryItemNames.sort().reverse())
});

test('ID=2; Verify sorting ASC ', async ({ page }) => {
  await page.locator('select.product_sort_container').selectOption('Name (A to Z)');

const inventoryItemNames = await extractTextContent(page, '.inventory_item_name', 'element => element.textContent.trim()'); 

const sortedInventoryItemNames = sortInventoryItemNames(inventoryItemNames)
  
expect(sortedInventoryItemNames).toEqual(inventoryItemNames.sort())
});

test('ID=3; Verify sorting price from low to high ', async ({ page }) => {
  await page.locator('select.product_sort_container').selectOption('Price (low to high)');

const inventoryItemPrices = await extractTextContent(page, '.inventory_item_price', 'element => parseFloat(element.textContent.trim().replace("$", ""))');


const sortedInventoryItemPrices = inventoryItemPrices.slice().sort(((a, b) => a - b))

expect(sortedInventoryItemPrices).toEqual(inventoryItemPrices.sort(((a, b) => a - b)))
});

test('ID=4; Verify sorting price from high to low ', async ({ page }) => {
  await page.locator('select.product_sort_container').selectOption('Price (high to low)');

const inventoryItemPrices = await extractTextContent(page, '.inventory_item_price', 'element => parseFloat(element.textContent.trim().replace("$", ""))');

const sortedInventoryItemPrices = inventoryItemPrices.slice().sort(((a, b) => b - a))
  
expect(sortedInventoryItemPrices).toEqual(inventoryItemPrices.sort(((a, b) => b - a)))  
});

})
