import { createClient } from "../services/prismicio";

const prismicClient = createClient();

export async function fetchPrismicOpportunities() {
  const opportunities = await prismicClient.getAllByType("oportunity", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
  });

  return opportunities;
}
