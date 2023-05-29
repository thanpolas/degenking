/**
 * Quest data type definition.
 *
 * @typedef {Object} questData
 * @property {number} version Quest core version.
 * @property {number} chainId The chain id the quest is on.
 * @property {string} networkName The network name quest is on.
 * @property {number} questId The quest id.
 * @property {string} questInstanceId The quest Instance id (V3).
 * @property {string} questName Human readable quest name.
 * @property {string} questTypeId The Quest type id.
 * @property {string} questTypeName The quest type in human readable format.
 * @property {Array<number>} heroIds Hero ids on this quest.
 * @property {string} heroIdsStr Hero ids on this quest stringified.
 * @property {string} playerAddress 0x address of player.
 * @property {string} playerAddressLower 0x address of player, lowercased.
 * @property {number} startBlock Block quest started.
 * @property {Date} startedAt When quest started.
 * @property {Date} completesAt When quest completes.
 * @property {string} completes Human readable distance to complete time.
 * @property {boolean} questFinished If current time is past the completesAt.
 * @property {number} attempts Quest attempts.
 * @property {number} status Raw status value from quest.
 * @property {number} level Quest level.
 */
