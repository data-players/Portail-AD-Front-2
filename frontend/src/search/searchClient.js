import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

const searchClient = instantMeiliSearch(
  'https://meilisearch.data-players.com/',
  'Port@ilAD'
);

export default searchClient;
