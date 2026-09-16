Pokédex Discovery — Coveo Technical Challenge

A Coveo-powered search experience for discovering Pokémon by name, type, generation, and relevance.

This project was built for the Coveo Forward Deployed Engineer technical challenge using Coveo Atomic, Coveo Headless, and Vite. The goal was to take content indexed from PokémonDB and turn it into a clean, intuitive search experience using Coveo's search and relevance platform.

Live Demo

Pokédex Discovery:
https://defsnowleopard.github.io/pokemon-coveo-search/

What I Built

The application provides a search experience specifically designed around Pokémon data.

Users can:

Search the Pokédex using Coveo-powered search
View query suggestions and instant results
Filter Pokémon by Type
Filter Pokémon by Generation
Sort results by Best Match, A–Z, or Z–A
View Pokémon images directly in search results
See Pokémon type and generation metadata
Navigate paginated results

The interface was customized from the Coveo Atomic framework into a Pokémon-specific discovery experience rather than using the default Atomic sample interface.

Coveo Implementation
Content Source

Pokémon content is indexed in Coveo from PokémonDB.

The search interface is restricted to the Pokémon source:

engine.dispatch(
  loadAdvancedSearchQueryActions(engine).updateAdvancedSearchQueries({
    aq: '@source==("PokemonDB-Pokedex2")',
  })
);

This ensures that the interface only returns content from the intended Pokémon dataset.

Custom Fields

I created and exposed Pokémon-specific metadata for use in the search experience:

pokemon_image
pokemon_type
pokemon_generation

These fields support the result cards, filtering experience, and visual presentation of the indexed content.

The fields are registered with the search engine before the initial search executes:

engine.dispatch(
  fieldActions.registerFieldsToInclude([
    'pokemon_image',
    'pokemon_type',
    'pokemon_generation',
  ])
);
Search Experience
Type Facet

Users can refine results using the Pokémon type field.

<atomic-facet
  field="pokemon_type"
  label="Type">
</atomic-facet>
Generation Facet

Generation is implemented as a numeric facet with ranges corresponding to Pokémon generations.

<atomic-numeric-facet
  field="pokemon_generation"
  label="Generation">
</atomic-numeric-facet>

This allows users to move from a broad search experience into more targeted discovery.

Sorting

The interface provides three sorting options:

Best Match
A–Z
Z–A

Relevance remains the default so Coveo determines the most appropriate results for the query before a user explicitly changes the sort order.

Search Architecture

The project follows a straightforward Coveo search flow:

PokémonDB
    ↓
Coveo Source
    ↓
Coveo Index
    ↓
Custom Pokémon Fields
    ↓
Search Hub / Query Processing
    ↓
Coveo Headless Search Engine
    ↓
Atomic Components
    ↓
Pokédex Discovery UI

The application builds a Coveo Headless search engine and then passes that engine to the Atomic search interface.

const engine = buildSearchEngine({
  configuration: {
    organizationId: 'katpokemonchallengecezvmacy',
    accessToken: 'SEARCH_TOKEN',
    search: {
      searchHub: 'PokemonSearch',
    },
  },
});

await searchInterface.initializeWithSearchEngine(engine);

This separation lets Headless manage search state and communication with Coveo while Atomic provides the UI components.

Technology
Coveo Cloud Platform — indexing and search
Coveo Atomic — search UI components
Coveo Headless — search engine and state management
JavaScript
HTML
CSS
Vite
GitHub Pages
Project Structure
pokemon-coveo-search/
│
├── index.html
│   └── Atomic search interface, facets, results, and sorting
│
├── src/
│   ├── main.js
│   │   └── Coveo engine configuration and search behavior
│   │
│   └── style.css
│       └── Custom Pokédex interface styling
│
├── public/
│   └── Static assets and imagery
│
├── vite.config.js
│   └── Vite and Atomic asset configuration
│
├── package.json
└── README.md
Running Locally

Clone the repository:

git clone https://github.com/defsnowleopard/pokemon-coveo-search.git

Move into the project:

cd pokemon-coveo-search

Install dependencies:

npm install

Start the development server:

npm run dev

Create a production build:

npm run build
Design Decisions

For this challenge, I wanted the search experience to feel like a lightweight Pokédex rather than a generic enterprise search page.

I focused on a few areas that would make the indexed data genuinely useful to a user:

Structured metadata
Type and generation became searchable/filterable fields instead of remaining information buried within the page content.

Discovery as well as direct search
A user does not need to know exactly which Pokémon they want. Facets allow them to explore the dataset by characteristics such as type or generation.

Relevance first
Coveo relevance is the default sorting behavior, with alphabetical sorting available when the user wants more deterministic browsing.

Visual results
Pokémon imagery and metadata are surfaced directly in the result cards so users can identify results quickly without opening every page.

Source control
The search interface explicitly limits results to the Pokémon source rather than relying on the organization containing only one relevant dataset.

Scope

I prioritized completing the core search experience cleanly and making the implementation easy to understand and demonstrate.

The project focuses on the essential challenge requirements: indexing searchable content, configuring Coveo, building the Atomic interface, exposing useful metadata, implementing facets and sorting, and presenting the result as a usable search experience.

Given additional development time, areas I would explore next include:

More sophisticated query pipeline rules
Additional Pokémon metadata and facets
Search analytics and behavioral tuning
Recommendation or related-Pokémon experiences
Generative answering over appropriate Pokémon content
Additional responsive and accessibility testing
About the Project

Built by Kat Litton as part of the Coveo Forward Deployed Engineer technical challenge.

The part of this project I found most interesting was not simply building the interface, but deciding how the underlying content should be structured so Coveo could turn it into a useful discovery experience.
