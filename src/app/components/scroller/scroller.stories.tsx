import type { Meta, StoryObj } from "@storybook/react-vite";

import Scroller from "./scroller";

const meta = {
  title: "Organisms/Scroller",
  component: Scroller,
} satisfies Meta<typeof Scroller>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
