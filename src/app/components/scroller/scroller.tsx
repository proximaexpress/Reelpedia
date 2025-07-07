import { Box } from "@mui/material";
import { VList, type VListHandle } from "virtua";
import { useEffect, useRef } from "react";

import ArticleCard from "../article-card/article-card";

import { useWikipedia } from "~/hooks/useWikipedia";

export default function Scroller() {
  const FETCH_BATCH_SIZE = 20; // Limited by max extracts returned in a single request
  const scrollerVListRef = useRef<VListHandle>(null);

  const {
    articles,
    fetching,
    fetchWikipediaArticles
  } = useWikipedia();

  useEffect(() => {
    fetchWikipediaArticles();
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
            !fetching &&
            scrollerVListRef.current.findEndIndex() +
              Math.floor(FETCH_BATCH_SIZE / 2) >
              Object.keys(articles).length
          ) {
            // Trigger item fetching
            await fetchWikipediaArticles();
          }
        }}
      >
        {Object.entries(articles).map(([k, v]) =>
          <ArticleCard
            key={k}
            {...v}
          />
        )}
      </VList>
    </Box>
  );
}
