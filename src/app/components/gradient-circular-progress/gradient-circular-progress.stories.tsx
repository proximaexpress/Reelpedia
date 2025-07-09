import type { Meta, StoryObj } from "@storybook/react-vite";

import GradientCircularProgress from "./gradient-circular-progress";

const meta = {
  title: "Atoms/Gradient Circular Progress",
  component: GradientCircularProgress,
} satisfies Meta<typeof GradientCircularProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
