import { SearchArtifacts } from "@/store/search";
import { BASE_URL, HEADERS } from "./config";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useDeferredValue } from "react";
import { ArticlesFetchResponse, Artifact, ArtifactsFetchResponse } from "./types";
import axios from "axios";
const fetchArtifactsList = async ({
  pageParam = 1,
  query = "",
  signal,
}: {
  pageParam: number;
  query: string;
  signal: AbortSignal;
}) => {
  // Use 'q' for keyword search or just fetch the list
  const searchParam = query ? `&q=${encodeURIComponent(query)}` : "";
  const url = `${BASE_URL}/artifacts?page=${pageParam}&limit=20${searchParam}`;

  const { data } = await axios.get(url, { headers: HEADERS, signal });

 
  // The CDLI API usually returns an array of artifacts directly
  // or inside a "data" or "results" key depending on the endpoint version.
  const artifacts: Artifact[] = Array.isArray(data)
    ? data
    : data.artifacts || [];

  return {
    artifacts,
    nextPage: artifacts.length === 20 ? pageParam + 1 : undefined,
  };
};

export const useFetchArtifactsList = () => {
  const searchTerm = useAtomValue(SearchArtifacts);
  const deferredSearchTerm = useDeferredValue(searchTerm);

  return useInfiniteQuery<ArtifactsFetchResponse, Error>({
    queryKey: ["Artifacts"],
    queryFn: ({ pageParam, signal }) =>
      fetchArtifactsList({
        pageParam: pageParam as number,
        query: deferredSearchTerm,
        signal,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};
