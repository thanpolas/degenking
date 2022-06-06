/**
 * @fileoverview Event (topic) signatures.
 */

exports.QUEST_CORE_V2_TOPIC_Paused =
  '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258';
exports.QUEST_CORE_V2_TOPIC_QuestCanceled =
  '0x98a9033bf3c6e71fcefc522215d5989dcf7539f7f378b31654f241339c5f91a5';
exports.QUEST_CORE_V2_TOPIC_QuestCompleted =
  '0x67e26712b58074cdab9610b340e1d33799dd0ec3632073666967c3ab3a95cc37';
exports.QUEST_CORE_V2_TOPIC_QuestReward =
  '0xd24d0ec0941a2f5cf71e34aab5120a6ec265b4ff45c78e510a05928202f82786';
exports.QUEST_CORE_V2_TOPIC_QuestSkillUp =
  '0xe101198cfc47e64406afc6679c04cd6d115ea4f039398cd8243e717f9219b166';
exports.QUEST_CORE_V2_TOPIC_QuestStaminaSpent =
  '0xdc5746df27e443efb54d93e1b78111844a3fe5efcabce72a649a9ce2ecbdf8e1';
exports.QUEST_CORE_V2_TOPIC_QuestStarted =
  '0xcd2e4b54b2fce23f49d6d6736c4bace12b03538601411fd43976795473ac9692';
exports.QUEST_CORE_V2_TOPIC_QuestXP =
  '0x9c39d9087162b6ffb6a639ad9d9134db96598a684324deb4a05a8cc57fcd7c0e';
exports.QUEST_CORE_V2_TOPIC_RewardMinted =
  '0xbb8bdf81af72aa9d540002b95d513f0b66e93d0fb4f7c6c9af5eb3f819d3e800';
exports.QUEST_CORE_V2_TOPIC_RoleAdminChanged =
  '0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff';
exports.QUEST_CORE_V2_TOPIC_RoleGranted =
  '0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d';
exports.QUEST_CORE_V2_TOPIC_RoleRevoked =
  '0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b';
exports.QUEST_CORE_V2_TOPIC_TrainingAttemptDone =
  '0xa630d0fa78162b4609ebc666671f53f12a76f591639b35cd0db031ce03ef89d0';
exports.QUEST_CORE_V2_TOPIC_TrainingSuccessRatio =
  '0x820ff224f089a191b36b26fb9936f8c4db0cc8b89e33ed986d07bbd192c7ff0e';
exports.QUEST_CORE_V2_TOPIC_Unpaused =
  '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa';

// Reverse the constants into TOPICS_REV
const topics = Object.keys(exports);
exports.TOPICS_REV = {};

topics.forEach((topicName) => {
  const topicValue = exports[topicName];

  exports.TOPICS_REV[topicValue] = topicName;
});
