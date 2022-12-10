/**
 * @fileoverview Generic GraphQL Query helper.
 */

const axios = require('axios');
const { delay } = require('@thanpolas/sidekick');

const configuration = require('../configure');

/** @const {number} MAX_RECORDS_PER_PAGE How many records per page to fetch */
const MAX_RECORDS_PER_PAGE = 1000;

/**
 * Will query a graphql endpoint.
 *
 * @param {Object} query The query to perform.
 * @param {Object=} variables GQL Variables, optional.
 * @param {string=} optAllRecordsKey If set, the entire dataset will be fetched
 *    using pagination, it is expected to have the key that contains the data
 *    so the operation can understand how many records it has received and when
 *    it has reached the end.
 * @param {number=} optPage The current page in case of pagination.
 * @param {number=} optRetries How many times the query has been retried.
 * @return {Promise<Object|void>} A Promise with the fetched data or void
 *    if query failed.
 */
exports.gqlQuery = async (
  query,
  variables,
  optAllRecordsKey,
  optPage = 0,
  optRetries = 0,
) => {
  try {
    if (optRetries > 15) {
      return;
    }

    const endpoint = configuration.get('gqlEndpoint');

    if (optAllRecordsKey) {
      variables.first = MAX_RECORDS_PER_PAGE;
      variables.skip = optPage * MAX_RECORDS_PER_PAGE;
    }

    const data = {
      query,
      variables,
    };

    const axiosParams = {
      method: 'post',
      url: endpoint,
      data,
    };

    const res = await axios(axiosParams);

    if (!res?.data) {
      optRetries += 1;
      return exports.gqlQuery(
        query,
        variables,
        optAllRecordsKey,
        optPage,
        optRetries,
      );
    }

    // Pagination for all records
    if (optAllRecordsKey) {
      if (res?.data?.data[optAllRecordsKey].length === MAX_RECORDS_PER_PAGE) {
        // Full data, fetch next page as well.
        optPage += 1;
        const nextPageData = await exports.gqlQuery(
          query,
          variables,
          optAllRecordsKey,
          optPage,
          optRetries,
        );
        res.data.data[optAllRecordsKey] = res.data.data[
          optAllRecordsKey
        ].concat(nextPageData.data[optAllRecordsKey]);
      }
    }

    return res.data;
  } catch (ex) {
    optRetries += 1;
    if (optRetries > 14) {
      throw ex;
    }
    await delay(1 * optRetries);
    return exports.gqlQuery(
      query,
      variables,
      optAllRecordsKey,
      optPage,
      optRetries,
    );
  }
};
