import { getPokemonInfo } from "../../shared/pokemonInfo";

const TOOLTIP_QUERY_SELECTOR = ".fieldmontip";

const start = () => {
  console.clear();
  const tooltips = document.querySelectorAll<HTMLElement>(
    TOOLTIP_QUERY_SELECTOR
  );

  const pokemonInfo = Array.from(tooltips)
    .map(getPokemonInfo)
    .filter((x) => x.hasInfo);

  pokemonInfo.forEach((x) => x.log());

  console.log(`Total Pokémon listed in console: ${pokemonInfo.length}`);
};

setInterval(start, 5000);
