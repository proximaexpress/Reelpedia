interface WikipediaBaseAPIResponse {
  batchcomplete?: string;
  continue?: {
    rncontinue?: string;
    continue?: string;
  };
}

interface WikipediaRandomAPIResponse extends WikipediaBaseAPIResponse {
  query: {
    random: WikipediaArticleMetadata[];
  };
}

interface WikipediaExtractAPIResponse extends WikipediaBaseAPIResponse {
  query: {
    pages: {
      [pageId: string]: WikipediaArticleExtract;
    };
  };
}

interface WikipediaImageAPIResponse extends WikipediaBaseAPIResponse {
  query: {
    pages: {
      [pageId: string]: WikipediaArticleImage;
    };
  };
}

interface WikipediaArticleImage {
  pageid: number;
  ns: number;
  title: string;
  thumbnail?: WikipediaImage;
  original?: WikipediaImage;
  pageimage?: string;
}

interface WikipediaArticleExtract {
  pageid: number;
  ns: number;
  title: string;
  extract: string;
}

interface WikipediaArticleMetadata {
  id: number;
  ns: number;
  title: string;
}

interface WikipediaImage {
  source: string;
  width: number;
  height: number;
}

export type {
  WikipediaExtractAPIResponse,
  WikipediaImageAPIResponse,
  WikipediaRandomAPIResponse,
};
