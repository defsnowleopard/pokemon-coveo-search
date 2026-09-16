import {defineCustomElements} from '@coveo/atomic/loader';
import '@coveo/atomic/themes/coveo.css';

import {
  buildSearchEngine,
  loadAdvancedSearchQueryActions,
  loadFieldActions,
} from '@coveo/headless';

defineCustomElements();

const engine = buildSearchEngine({
  configuration: {
    organizationId: 'katpokemonchallengecezvmacy',
    accessToken: 'xx136029a4-34e7-421c-a78c-7f0299de917b',
    search: {
      searchHub: 'PokemonSearch',
    },
  },
});

const searchInterface = document.querySelector(
  'atomic-search-interface'
);

await customElements.whenDefined('atomic-search-interface');

await searchInterface.initializeWithSearchEngine(engine);

// Make custom Pokemon fields available in search results.
const fieldActions = loadFieldActions(engine);

engine.dispatch(
  fieldActions.registerFieldsToInclude([
    'pokemon_image',
    'pokemon_type',
    'pokemon_generation',
  ])
);

// Restrict this interface to the Pokemon source.
engine.dispatch(
  loadAdvancedSearchQueryActions(engine).updateAdvancedSearchQueries({
    aq: '@source==("PokemonDB-Pokedex2")',
  })
);

searchInterface.executeFirstSearch();