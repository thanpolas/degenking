/**
 * @fileoverview Hero's owner profile related functions.
 */

const { NETWORK_IDS } = require('../constants/constants.const');
const etherEnt = require('../ether');
const { unixToJsDate } = require('../utils/helpers');

const { getProvider } = etherEnt;

/**
 * Will query for the profile data on DFK based on the address.
 *
 * @param {number} chainId The chain id.
 * @param {string} ownerAddress The owner's address to query by.
 * @return {Object|null} Normalized profile data object or null if not found.
 */
exports.getProfileByAddress = async (chainId, ownerAddress) => {
  // FIXME - Temporary override of chain to be used because profile
  //    contract does not exist on CV yet.
  chainId = NETWORK_IDS.HARMONY;

  const currentRPC = await getProvider(chainId);
  const { lastBlockMined } = currentRPC;
  const profileContract = etherEnt.getContractProfile(currentRPC);

  let fetchedProfile = null;
  const ownerAddressL = ownerAddress.toLowerCase();

  const queryParams = {};
  // Only use blockTag on harmony network - on DFKN it'll create issues
  if (chainId === NETWORK_IDS.HARMONY) {
    queryParams.blockTag = lastBlockMined;
  }

  try {
    fetchedProfile = await profileContract.getProfileByAddress(
      ownerAddressL,
      queryParams,
    );
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
