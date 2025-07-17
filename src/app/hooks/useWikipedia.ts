import ky from "ky";
import { useState } from "react";

import type { Article } from "~/components/article-card/article-card";
import type { WikipediaQueryAPIResponse } from "~/types/api";

export function useWikipedia() {
  const API_URL = "https://en.wikipedia.org/w/api.php";
  const FETCH_BATCH_SIZE = 20; // Limited by max extracts returned in a single request

  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesViewed, setArticlesViewed] = useState<Record<string, Article>>(
    {},
  );
  const [fetching, setFetching] = useState<boolean>(false);

  const fetchWikipediaArticles = async () => {
    if (fetching) {
      return;
    } else {
      setFetching(true);
    }

    // Fetch a list of random articles
    const searchParams = new URLSearchParams({
      origin: "*",
      format: "json",
      action: "query",
      prop: "info|extracts|pageimages",
      generator: "random",
      grnnamespace: "0",
      grnlimit: FETCH_BATCH_SIZE.toString(),
      pithumbsize: "600",
      piprop: "thumbnail|name|original",
      exlimit: "20",
      exsentences: "3",
      exintro: "true",
      explaintext: "true",
    });
    const fetchedArticles = await ky
      .get(`${API_URL}?${searchParams.toString()}`)
      .json<WikipediaQueryAPIResponse>()
      .then((randomAPIResponse) => {
        const a: Record<string, Article> = {};
        for (const [, v] of Object.entries(randomAPIResponse.query.pages)) {
          // Skip over articles without images
          if (!v?.thumbnail) {
            continue;
          }

          a[v.title] = {
            title: v.title,
            extract: v.extract,
            image: v?.thumbnail?.source,
          };
        }

        return a;
      })
      .catch((err) => console.error(err));

    // Add unviewed articles and update viewed set
    if (fetchedArticles) {
      const unviewedArticles = Object.entries(fetchedArticles)
        .filter(([k]) => !(k in articlesViewed))
        .map(([, v]) => v);
      setArticles((prev) => [...prev, ...unviewedArticles]);
      setArticlesViewed((prev) => ({ ...prev, ...fetchedArticles }));
    }

    setFetching(false);

    return fetchedArticles;
  };

  return {
    articles,
    fetching,
    fetchWikipediaArticles,
  };
}
