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
  return <Scroller />;
}
