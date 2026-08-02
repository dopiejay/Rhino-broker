import { createContext, useContext } from "react";

export const SiteContentContext = createContext(null);

export function useSiteContent() {
  return useContext(SiteContentContext);
}
