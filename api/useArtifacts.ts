import { SearchArtifacts } from "@/store/search";
import { BASE_URL, HEADERS } from "./config";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetch } from "expo/fetch";
import { useAtomValue } from "jotai";
import { useDeferredValue } from "react";
import { Artifact, ArtifactsFetchResponse } from "./types";

const fetchArtifactsList = async ({ pageParam = 1, query = "" }) => {
  // Use 'q' for keyword search or just fetch the list
  const searchParam = query ? `&q=${encodeURIComponent(query)}` : "";
  const url = `${BASE_URL}/artifacts?page=${pageParam}&limit=20${searchParam}`;

  const response = await fetch(url, { headers: HEADERS });
  const data = await response.json();
  
console.log(query)
  // The CDLI API usually returns an array of artifacts directly
  // or inside a "data" or "results" key depending on the endpoint version.
const artifacts: Artifact[] = Array.isArray(data) ? data : (data.artifacts || []);

  return {
    artifacts,
    nextPage: artifacts.length === 20 ? pageParam + 1 : undefined,
  };
};

export const useFetchArtifactsList = () => {
  const searchTerm = useAtomValue(SearchArtifacts);
  const deferredSearchTerm = useDeferredValue(searchTerm);

  return useInfiniteQuery<ArtifactsFetchResponse, Error>({
    queryKey: ["Artifacts", deferredSearchTerm],
    queryFn: ({ pageParam }) =>
      fetchArtifactsList({
        pageParam: pageParam as number,
        query: searchTerm,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: (1000 * 60 * 60) * 3,
    initialPageParam: 1,
  });
};
