import { useEffect, useRef } from "react";

import { Box } from "@mui/material";
import { VList, type VListHandle } from "virtua";

import { useWikipedia } from "~/hooks/useWikipedia";

import { display } from "~/features/ui/uiSlice";
import { useAppDispatch } from "~/hooks/useStore";

import ArticleCard from "../article-card/article-card";

export default function Scroller() {
  const FETCH_BATCH_SIZE = 20; // Limited by max extracts returned in a single request
  const scrollerVListRef = useRef<VListHandle>(null);

  const dispatch = useAppDispatch();

  const { articles, fetching, fetchWikipediaArticles } = useWikipedia();

  useEffect(() => {
    fetchWikipediaArticles();
  }, []);

  useEffect(() => {
    if (!scrollerVListRef.current) {
      return;
    }

    const snappedIndex = scrollerVListRef.current.findStartIndex();
    const article = articles.at(snappedIndex);
    if (article) {
      dispatch(display(article));
    }
  }, [articles]);

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <VList
        ref={scrollerVListRef}
        style={{
          height: "100%",
          overflowY: "scroll",
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
              articles.length
          ) {
            // Trigger item fetching
            await fetchWikipediaArticles();
          }
        }}
        onScrollEnd={() => {
          if (!scrollerVListRef.current) {
            return;
          }

          const snappedIndex = scrollerVListRef.current.findStartIndex();
          const article = articles.at(snappedIndex);
          if (article) {
            dispatch(display(article));
          }
        }}
      >
        {articles.map((v) => (
          <ArticleCard key={v.title} {...v} />
        ))}
      </VList>
    </Box>
  );
}
