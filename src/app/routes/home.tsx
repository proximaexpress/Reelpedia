import { Box } from "@mui/material";

import Scroller from "~/components/scroller/scroller";

import type { JSX } from "react";
import type { Route } from "./+types/home";

import "~/components/scroller/scroller.css";

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
        className="scroller-player"
        sx={{
          "@media screen and (orientation: landscape)": {
            borderRadius: 4,
          },
        }}
      >
        <Scroller />
      </Box>
    </Box>
  );
}
