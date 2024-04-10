const { expect } = require('playwright/test');
const { test } = require('../src/fixture.js');
const { sortInventoryItemNames } = require('../src/Helper.js');
const { extractTextContent } = require('../src/Helper.js');


test.describe('Test Suite1', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.performLogin('standard_user', 'secret_sauce');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  // Parametrized test for sorting
  const sortingTestData = [
    { sortOption: 'Name (Z to A)', expectedOrder: 'DESC' },
    { sortOption: 'Name (A to Z)', expectedOrder: 'ASC' },
    { sortOption: 'Price (low to high)', expectedOrder: 'PriceASC' },
    { sortOption: 'Price (high to low)', expectedOrder: 'PriceDesc' }
  ];

  for (const testData of sortingTestData) {
    test(`Verify sorting ${testData.expectedOrder}`, async ({ page }) => {
      await page.locator('select.product_sort_container').selectOption(testData.sortOption);

      const inventoryItemNames = await extractTextContent(page, '.inventory_item_name', 'element => element.textContent.trim()');
      const inventoryItemPrices = await extractTextContent(page, '.inventory_item_price', 'element => parseFloat(element.textContent.trim().replace("$", ""))');
        
      let sortedInventoryItemNames;
      let sortedInventoryItemPrices;
      if (testData.expectedOrder === 'DESC') {
        sortedInventoryItemNames = inventoryItemNames.slice().sort((a, b) => {
          if (a < b) return 1;
          if (a > b) return -1;
          return 0;
        });
      } else if (testData.expectedOrder === 'ASC') {
        sortedInventoryItemNames = sortInventoryItemNames(inventoryItemNames);
      } else if (testData.expectedOrder === 'PriceASC'){
        sortedInventoryItemPrices = inventoryItemPrices.slice().sort(((a, b) => a - b))
      }
      else if (testData.expectedOrder === 'PriceDesc') {
        sortedInventoryItemPrices = inventoryItemPrices.slice().sort(((a, b) => b - a))
      }

      if (testData.expectedOrder === 'DESC') {
        // Assertion for descending order
        expect(sortedInventoryItemNames).toEqual(inventoryItemNames.sort().reverse())
      } else if (testData.expectedOrder === 'ASC') {
        // Assertion for ascending order
        expect(sortedInventoryItemNames).toEqual(inventoryItemNames.sort())
      }
      else if (testData.expectedOrder === 'PriceASC') {
        // Assertion for ascending order prices
        expect(sortedInventoryItemPrices).toEqual(inventoryItemPrices.sort(((a, b) => a - b)))
      }
      else if (testData.expectedOrder === 'PriceDesc') {
        // Assertion for descending order prices
        expect(sortedInventoryItemPrices).toEqual(inventoryItemPrices.sort(((a, b) => b - a)))
      }
    });
  }
});
