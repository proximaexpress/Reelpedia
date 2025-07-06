import ArticleCard from "../article-card/article-card";
import { Box } from "@mui/material";
import { VList, type VListHandle } from "virtua";
import { useEffect, useRef, useState } from "react";

import { type JSX } from "react";

async function fetchItems(
  start: number,
  fetchBatchSize: number,
): Promise<JSX.Element[]> {
  // TODO extract into a util hook
  const articles: JSX.Element[] = [];

  for (let i = 0; i < fetchBatchSize; i++) {
    articles.push(
      <ArticleCard
        key={start + i}
        title="Lorem ipsum"
        extract="The quick brown fox jumped"
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/SeagullOverWave.jpg/960px-SeagullOverWave.jpg"
      />,
    );
  }
  return articles;
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
