import { Gender, PokemonInfo, PokemonInfoSearch } from "./types";
import { EVOLUTION_MAPPING } from "./evolution_map";
import { IGNORED_SPECIES } from "./ignored_species";

/**
 * Extracts the gender of the Pokemon by checking the image rendered
 * @param element the tooltip element
 * @returns The gender type
 */
const getGender = (element: Element) => {
  if (element.querySelector('img[src*="gender_m.png"]')) {
    return Gender.Male;
  }
  if (element.querySelector('img[src*="gender_f.png"]')) {
    return Gender.Female;
  }
  return null;
};

/**
 * Extracts the specified child information from the tooltip content
 * @param element The tooltip content HTML element
 * @param elementIndex The index of the child element in the tooltip
 * @returns parsed info from the specific child, for example "Species: Test123" will return "Test123"
 */
const getSpecifiedField = (
  element: HTMLElement,
  elementIndex: number
): string | null => {
  const childNode = element.childNodes[elementIndex] as HTMLElement;
  const text = childNode.innerText || childNode.textContent;
  const [_, info] = text.split(":");
  return info?.trim();
};

const getNature = (natureText: string | null) => {
  return natureText ? natureText.replace(/\s*\(.*?\)/, "").trim() : null;
};

const isSpeciesOrEvolutionInSearch = (
  pokemon: PokemonInfo,
  search: Partial<PokemonInfo>[]
) => {
  const { species, forme, baseForm, gender } = pokemon;
  // First, check if the species directly matches the search list
  const searchItem = search.find((item) => item.species === species);

  // If no search item found, check the evolution line (i.e., check base form)
  if (!searchItem) {
    // Check for evolution-based match and gender and forme match
    return search.some((item) => {
      // If the evolution matches, check the gender and forme as well
      if (item.species === baseForm) {
        return (
          (item.gender ? item.gender === gender : true) &&
          (item.forme ? item.forme === forme : true)
        );
      }
      return false;
    });
  }

  // If gender and forme are specified in the search list, check for matches
  if (searchItem.gender && searchItem.forme) {
    return searchItem.gender === gender && searchItem.forme === forme;
  }

  // If gender is specified, check for gender match
  if (searchItem.gender) {
    return searchItem.gender === gender;
  }

  // If forme is specified, check for forme match
  if (searchItem.forme) {
    return searchItem.forme === forme;
  }

  // If no gender or forme specified, return true (any gender and forme for that species)
  return true;
};

/**
 * Gets the Pokemon info from the tooltip
 * @param element The tooltip element
 * @returns the parsed Pokemon info
 */
export const getPokemonInfo = (element: HTMLElement): PokemonInfo => {
  const species = getSpecifiedField(element, 3);
  const baseForm = EVOLUTION_MAPPING[species];
  const forme =
    species && !IGNORED_SPECIES.includes(species)
      ? getSpecifiedField(element, 4)
      : null;
  const nature = getNature(getSpecifiedField(element, forme ? 9 : 8));
  const gender = getGender(element);
  const linkElement = element.querySelector("a");
  const link = linkElement ? linkElement.href : null;

  const pokemon = {
    baseForm,
    species,
    nature,
    forme,
    gender,
    link,
    hasInfo: Boolean(species && baseForm),
    isSpeciesOrEvolutionInSearch: (search: PokemonInfoSearch[]) =>
      isSpeciesOrEvolutionInSearch(pokemon, search),
    log: () =>
      console.log(
        `Species: ${pokemon.baseForm}, `,
        `Gender: ${pokemon.gender || "N/A"}, `,
        `Nature: ${pokemon.nature || "N/A"}, `,
        `Forme: ${pokemon.forme || "N/A"}, `,
        `Link: ${pokemon.link || "No link"}`
      ),
  };

  return pokemon;
};
