/**
 * @fileoverview Hero's owner profile related functions.
 */

const { unixToJsDate, shortAddress } = require('@thanpolas/sidekick');

const {
  NETWORK_IDS,
  AVAILABLE_CHAIN_IDS,
} = require('../constants/constants.const');
const etherEnt = require('../ether');

const { getProvider } = etherEnt;

/**
 * Will query for the profile data on DFK based on the address.
 *
 * @param {number} chainId The chain id.
 * @param {string} ownerAddress The owner's address to query by.
 * @return {Object|null} Normalized profile data object or null if not found.
 */
exports.getProfileByAddress = async (chainId, ownerAddress) => {
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

/**
 * An augmented DFK Profile object
 *
 * @typedef {Object} dfkProfile
 * @property {number} id "id" property from DFK - unused, usually 0.
 * @property {string} owner The full address of the profile, lowercased.
 * @property {string} name The profile name.
 * @property {Date} created The date the profile was created.
 * @property {number} picId The profile picture ID.
 * @property {number} heroId The hero ID.
 * @property {number} points The profile points.
 * @property {boolean} notFound If true, the profile was not found.
 */

/**
 * Will query for the profile data on DFK based on the address, regardless
 * of chain id.
 *
 * @param {string} ownerAddress The owner's address to query by.
 * @param {boolean=} isRetry If true, this is a retry attempt.
 * @return {dfkProfile} Normalized profile data object or null if not found.
 */
exports.getProfileByAddressAnyChain = async (ownerAddress, isRetry = false) => {
  const ownerAddressL = ownerAddress.toLowerCase();

  // Feb 2023 hack: Legacy profile names may exist on harmony network
  //  so add harmony to the available chain ids.
  const allChainIdsToQuery = AVAILABLE_CHAIN_IDS.concat([NETWORK_IDS.HARMONY]);

  // Find on which realm the profile is
  const allPromises = allChainIdsToQuery.map((chainId) => {
    const response = exports.getProfileByAddress(chainId, ownerAddressL);
    return response;
  });

  const results = await Promise.allSettled(allPromises);

  // get the result with the values
  const resultValues = results.filter((result) => {
    if (result.status !== 'fulfilled') {
      return false;
    }

    if (result.value) {
      return true;
    }
    return false;
  });

  if (!resultValues.length) {
    // If no results found, attempt a single retry, otherwise return a custom
    // response with the address shortenned.
    if (!isRetry) {
      return exports.getProfileByAddressAnyChain(ownerAddress, true);
    }

    const customResponse = {
      id: 0,
      owner: ownerAddressL,
      name: shortAddress(ownerAddressL),
      created: new Date(0),
      picId: 0,
      heroId: 0,
      points: 0,
      notFound: true,
    };

    return customResponse;
  }

  const [successResult] = resultValues;
  const { value } = successResult;

  value.notFound = false;
  return value;
};
