import { getPokemonInfo } from "../../shared/pokemonInfo";
import { QUERY_SELECTORS } from "../../shared/selectors";

const start = () => {
  console.clear();
  const tooltips = document.querySelectorAll<HTMLElement>(
    QUERY_SELECTORS.tooltip
  );

  const pokemonInfo = Array.from(tooltips)
    .map(getPokemonInfo)
    .filter((x) => x.hasInfo);

  pokemonInfo.forEach((x) => x.log());

  console.log(`Total Pokémon listed in console: ${pokemonInfo.length}`);
};

setInterval(start, 5000);
