import type { Meta, StoryObj } from "@storybook/react-vite";

import { useEffect } from "react";

import { useAppDispatch } from "~/hooks/useStore";

import ScrollerActionBar from "./scroller-action-bar";
import { display } from "~/features/ui/uiSlice";

const mockedDisplayedArticle = {
  title: "Seven Seas Lagoon",
  extract:
    "The Seven Seas Lagoon is an artificial lake at the Walt Disney World Resort in Bay Lake, Florida, near Orlando. Located south of the Magic Kingdom theme park, the Seven Seas Lagoon serves as a natural buffer between the Magic Kingdom and its parking lot and connects with the adjacent Bay Lake. The lake reaches a depth of 14 feet (4.3 m).",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Magic_Kingdom_-_Castle_from_Lagoon.jpg/960px-Magic_Kingdom_-_Castle_from_Lagoon.jpg",
};

const meta = {
  title: "Molecules/Scroller Action Bar",
  component: ScrollerActionBar,
} satisfies Meta<typeof ScrollerActionBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const dispatch = useAppDispatch();
      useEffect(() => {
        dispatch(display(mockedDisplayedArticle));
      }, []);
      return <Story />;
    },
  ],
};
