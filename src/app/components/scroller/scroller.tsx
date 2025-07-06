import { Box } from "@mui/material";
import ky from "ky";
import { VList, type VListHandle } from "virtua";
import { useEffect, useRef, useState } from "react";

import ArticleCard from "../article-card/article-card";

import type { Article } from "../article-card/article-card";
import type { JSX } from "react";
import type {
  WikipediaExtractAPIResponse,
  WikipediaImageAPIResponse,
  WikipediaRandomAPIResponse,
} from "../../types/api";

async function fetchItems(
  start: number,
  fetchBatchSize: number,
): Promise<JSX.Element[]> {
  // TODO extract into a util hook
  const articleCardElements: JSX.Element[] = [];
  const articles: Record<string, Article> = {};

  // Fetch a list of random articles
  const apiURL = "https://en.wikipedia.org/w/api.php";

  let searchParams = new URLSearchParams({
    origin: "*",
    format: "json",
    action: "query",
    list: "random",
    rnnamespace: "0",
    rnlimit: fetchBatchSize.toString(),
  });
  const randomAPIResponse = await ky
    .get(`${apiURL}?${searchParams.toString()}`)
    .json<WikipediaRandomAPIResponse>();
  const articleTitles = randomAPIResponse.query.random.map((a) => a.title);

  // Fetch the article details
  searchParams = new URLSearchParams({
    origin: "*",
    format: "json",
    action: "query",
    prop: "extracts",
    titles: articleTitles.join("|"),
    exlimit: "20",
    exsentences: "3",
    exintro: "true",
    explaintext: "true",
  });
  const extractAPIResponse = await ky
    .get(`${apiURL}?${searchParams.toString()}`)
    .json<WikipediaExtractAPIResponse>();
  for (const [, v] of Object.entries(extractAPIResponse.query.pages)) {
    articles[v.title] = { ...articles[v.title], extract: v.extract };
  }

  // Fetch the article images
  searchParams = new URLSearchParams({
    origin: "*",
    format: "json",
    action: "query",
    prop: "pageimages",
    titles: articleTitles.join("|"),
    pithumbsize: "600",
    piprop: "thumbnail|name|original",
  });
  const imageAPIResponse = await ky
    .get(`${apiURL}?${searchParams.toString()}`)
    .json<WikipediaImageAPIResponse>();
  for (const [, v] of Object.entries(imageAPIResponse.query.pages)) {
    articles[v.title] = { ...articles[v.title], image: v?.thumbnail?.source };
  }

  // Compose ArticleCard and store
  for (const [k, v] of Object.entries(articles)) {
    articleCardElements.push(<ArticleCard key={k.toLowerCase()} {...v} />);
  }

  return articleCardElements;
}

export default function Scroller() {
  const FETCH_BATCH_SIZE = 5;
  const scrollerVListRef = useRef<VListHandle>(null);
  const fetching = useRef<boolean>(true);
  const [items, setItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    fetchItems(0, FETCH_BATCH_SIZE)
      .then((resp) => setItems(resp))
      .then(() => (fetching.current = false));
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        maxWidth: "sm",
        p: 0,
      }}
    >
      <VList
        ref={scrollerVListRef}
        style={{
          height: "100%",
          width: "100%",
          overflow: "hidden scroll",
          scrollSnapType: "y mandatory",
          scrollPaddingTop: 0,
          scrollbarWidth: "none",
        }}
        onScroll={async () => {
          if (!scrollerVListRef.current) {
            return;
          }

          if (
            !fetching.current &&
            scrollerVListRef.current.findEndIndex() +
              Math.floor(FETCH_BATCH_SIZE / 2) >
              items.length
          ) {
            // Lock to prevent parallel fetches
            fetching.current = true;
            const newItems = await fetchItems(items.length, FETCH_BATCH_SIZE);
            setItems((prev) => [...prev, ...newItems]);
            fetching.current = false;
          }
        }}
      >
        {items}
      </VList>
    </Box>
  );
}
