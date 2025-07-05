import type { Meta, StoryObj } from "@storybook/react-vite";

import Scroller from "./scroller";

const meta = {
  component: Scroller,
} satisfies Meta<typeof Scroller>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
