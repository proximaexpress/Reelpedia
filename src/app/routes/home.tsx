import { Box, useTheme } from "@mui/material";

import Scroller from "~/components/scroller/scroller";
import ScrollerActionBar from "~/components/scroller/scroller-action-bar";

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
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <ScrollerActionBar
        sx={{
          height: "calc(100vh - 96px)",
          mt: "5%",

          "@media screen and (orientation: portrait)": {
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1,
          },
        }}
      />

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
