
import { BASE_URL, HEADERS } from "./config";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Article, ArticlesFetchResponse, ArtifactsFetchResponse } from "./types";
import axios from "axios";

const fetchArticlesList = async ({
  pageParam = 1,

  signal,
}: {
  pageParam: number;

  signal: AbortSignal;
}) => {
 
  const url = `${BASE_URL}/articles?page=${pageParam}&limit=12`;

  const {data} = await axios.get(url, { headers: HEADERS, signal });

 
  // The CDLI API usually returns an array of artifacts directly
  // or inside a "data" or "results" key depending on the endpoint version.
  const rawArticles: Article[] = Array.isArray(data)
    ? data
    : data.artifacts || [];

  // 2. Filter: Only keep items where content_html is present and not empty
  const filteredArticles = rawArticles.filter(
    (item) => item.content_html && item.content_html.trim().length > 0
  );
console.log(filteredArticles.length )
  return {
    articles: filteredArticles,
    nextPage: filteredArticles.length >= 3 ? pageParam + 1 : undefined,
  };
};

export const useFetchArticlesList = () => {


  return useInfiniteQuery<ArticlesFetchResponse, Error>({
    queryKey: ["Articles"],
    queryFn: ({ pageParam, signal }) =>
      fetchArticlesList({
        pageParam: pageParam as number,
        signal,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
   
  });
};
