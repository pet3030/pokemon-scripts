import { getPokemonInfo } from "../../shared/pokemonInfo";
import { QUERY_SELECTORS } from "../../shared/selectors";
import { Gender, PokemonInfoSearch } from "../../shared/types";

// List of Pokémon species to search for, with optional gender and forme specification
// Example: { species: 'Meowth', gender: 'M', forme: 'Alolan' } or { species: 'Charmander', gender: 'F' }
const SEARCH: PokemonInfoSearch[] = [
  { species: "Meowth", gender: Gender.Female },
];

const start = () => {
  console.clear();
  const tooltips = document.querySelectorAll<HTMLElement>(
    QUERY_SELECTORS.tooltip
  );

  const pokemonInfo = Array.from(tooltips)
    .map(getPokemonInfo)
    .filter((x) => x.hasInfo && x.isSpeciesOrEvolutionInSearch(SEARCH));

  pokemonInfo.forEach((x) => x.log());

  console.log(`Total Pokémon listed in console: ${pokemonInfo.length}`);
};

setInterval(start, 5000);
