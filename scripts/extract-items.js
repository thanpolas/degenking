/* eslint-disable no-console */
/**
 * @fileoverview Will process and produce a normalized items.json output from
 *    raw items file as fetched from the defikingdoms website.
 *  What it does:
 *    - Removes the ABI from within each record.
 *
 * Run as:
 *  node scripts/extract-items.js > src/constants/all-items.json
 *
 * Then go to the "all-items.json" file and save it once to get formatted.
 */

const allItemsRaw = require('../waste/all-items-raw.json');

/**
 * Processes and normalizes items from DFK.
 *
 */
async function run() {
  const itemKeys = Object.keys(allItemsRaw);

  const allItems = itemKeys.map((itemKey) => {
    const itemRaw = allItemsRaw[itemKey];
    delete itemRaw.abi;

    return itemRaw;
  });

  console.log(JSON.stringify(allItems, null, 4));
}

run();
