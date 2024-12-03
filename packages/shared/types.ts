export enum Gender {
  Male = "M",
  Female = "F",
}

export type PokemonInfo = {
  baseForm: string | null;
  species: string | null;
  nature: string | null;
  forme: string | null;
  gender: Gender | null;
  link: string | null;
  hasInfo: boolean;
  log: () => void;
  isSpeciesOrEvolutionInSearch: (search: PokemonInfoSearch[]) => boolean;
};

export type PokemonInfoSearch = Pick<PokemonInfo, "species" | "gender">;
