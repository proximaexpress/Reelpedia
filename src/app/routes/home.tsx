import { Box } from "@mui/material";

import Scroller from "~/components/scroller/scroller";

import type { JSX } from "react";
import type { Route } from "./+types/home";

// eslint-disable-next-line no-empty-pattern
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Reelpedia" },
    { name: "description", content: "Doomscroll your way to enlightenment!" },
  ];
}

export default function Home(): JSX.Element {
  return (
    <Box
      component="section"
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f0f0f",
      }}
    >
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          maxWidth: "sm",
          overflow: "hidden",

          "@media screen and (orientation: landscape)": {
            height: "calc(100vh - 96px)",
            width: "calc((100vh - 96px)*0.5625)",
            borderRadius: 4,
          },
        }}
      >
        <Scroller />
      </Box>
    </Box>
  );
}
