
import algoliasearch from 'algoliasearch';

const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const algoliaSearchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;

if (!algoliaAppId || !algoliaSearchKey) {
  throw new Error('Missing Algolia environment variables. Set NEXT_PUBLIC_ALGOLIA_APP_ID and NEXT_PUBLIC_ALGOLIA_SEARCH_KEY.');
}

export const searchClient = algoliasearch(algoliaAppId, algoliaSearchKey);
