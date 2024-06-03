import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

const searchClient = instantMeiliSearch(
  'https://meilisearch.data-players.com/',
  'D4t4-Pl4yers'
);

export default searchClient;
