interface WikipediaQueryAPIResponse {
  batchcomplete?: string;
  continue?: {
    grncontinue?: string;
    continue?: string;
  };
  query: {
    pages: {
      [pageId: string]: WikipediaArticle;
    };
  };
}

interface WikipediaArticle {
  pageid: number;
  ns: number;
  title: string;
  contentmodel: string;
  pagelanguage: string;
  pagelanguagehtmlcode: string;
  pagelanguagedir: string;
  touched: string;
  lastrevid: number;
  length: number;
  extract: string;
  thumbnail?: WikipediaImage;
  original?: WikipediaImage;
  pageimage?: string;
}

interface WikipediaImage {
  source: string;
  width: number;
  height: number;
}

export type { WikipediaQueryAPIResponse };
