import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

const searchClient = instantMeiliSearch(
  'https://meilisearch-hybrid.data-players.com/',
  'Port@ilAD-Hybrid'
);

export default searchClient;
