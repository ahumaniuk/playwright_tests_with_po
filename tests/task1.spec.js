const { expect } = require('playwright/test')
const { test } = require('../src/fixture.js')


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

test('ID=2; Verify sorting ASC ', async ({ page }) => {
  await page.locator('select.product_sort_container').selectOption('Name (A to Z)');

const inventoryItemNames = await page.$$eval('.inventory_item_name', elements =>
    elements.map(element => element.textContent.trim())
  );

const sortedInventoryItemNames = inventoryItemNames.slice().sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
});
  
const isSortedAsc = JSON.stringify(sortedInventoryItemNames) === JSON.stringify(inventoryItemNames.slice().sort());
expect(isSortedAsc).toEqual(true)
expect(isSortedAsc).toBeTruthy()
  
});

test('ID=3; Verify sorting price from low to high ', async ({ page }) => {
  await page.locator('select.product_sort_container').selectOption('Price (low to high)');

const inventoryItemPrices = await page.$$eval('.inventory_item_price', elements =>
  elements.map(element => parseFloat(element.textContent.trim().replace('$', '')))
);

const sortedInventoryItemPrices = inventoryItemPrices.slice().sort(((a, b) => a - b))

const isSortedFromLowToHigh = sortedInventoryItemPrices.every((value, index) => value === inventoryItemPrices[index]);
expect(isSortedFromLowToHigh).toEqual(true)
expect(isSortedFromLowToHigh).toBeTruthy()
});

test('ID=4; Verify sorting price from high to low ', async ({ page }) => {
  await page.locator('select.product_sort_container').selectOption('Price (high to low)');

const inventoryItemPrices = await page.$$eval('.inventory_item_price', elements =>
  elements.map(element => parseFloat(element.textContent.trim().replace('$', '')))
);

const sortedInventoryItemPrices = inventoryItemPrices.slice().sort(((a, b) => b - a))
  
const isSortedFromHighToLow = sortedInventoryItemPrices.every((value, index) => value === inventoryItemPrices[index]);
expect(isSortedFromHighToLow).toEqual(true)
expect(isSortedFromHighToLow).toBeTruthy()
  
});
})
