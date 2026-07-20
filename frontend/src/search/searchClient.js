import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

const { searchClient } = instantMeiliSearch(
  'https://meilisearch-hybrid.data-players.com/',
  'Port@ilAD-Hybrid',
  {
    meiliSearchParams: {
      hybrid: {
        semanticRatio: 0.3,
        embedder: 'default',
      },
    },
  }
);

export default searchClient;
