export function sortInventoryItemNames(inventoryItemNames) {
  return inventoryItemNames.slice().sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
  });
}

export async function extractTextContent(page, selector, transformFunction) {
  return await page.$$eval(selector, (elements, transformFunction) =>
    elements.map(element => eval(transformFunction))
  , transformFunction);
}

  
