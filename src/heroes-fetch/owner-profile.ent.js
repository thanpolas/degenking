/**
 * @fileoverview Hero's owner profile related functions.
 */

const etherEnt = require('../ether');
const { unixToJsDate } = require('../utils/helpers');

const { getProvider } = etherEnt;

/**
 * Will query for the profile data on DFK based on the address.
 *
 * @param {string} ownerAddress The owner's address to query by.
 * @return {Object|null} Normalized profile data object or null if not found.
 */
exports.getProfileByAddress = async (ownerAddress) => {
  const currentRPC = await getProvider();
  const { lastBlockMined } = currentRPC;
  const profileContract = etherEnt.getContractProfile(currentRPC);

  let fetchedProfile = null;
  const ownerAddressL = ownerAddress.toLowerCase();
  try {
    fetchedProfile = await profileContract.getProfileByAddress(ownerAddressL, {
      blockTag: lastBlockMined,
    });
  } catch (ex) {
    // suppress
    return null;
  }

  const createdNum = Number(fetchedProfile._created);
  const response = {
    id: Number(fetchedProfile._id),
    owner: fetchedProfile._owner.toLowerCase(),
    name: fetchedProfile._name,
    created: unixToJsDate(createdNum),
    picId: fetchedProfile._picId,
    heroId: Number(fetchedProfile._heroId),
    points: Number(fetchedProfile._points),
  };

  return response;
};
