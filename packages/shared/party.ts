import { QUERY_SELECTORS } from "./selectors";

export const isNotInParty = (element: HTMLElement) => {
  return !element.closest(QUERY_SELECTORS.party);
};
