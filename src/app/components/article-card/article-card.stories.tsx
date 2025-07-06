import type { Meta, StoryObj } from "@storybook/react-vite";

import ArticleCard from "./article-card";

const meta = {
  title: "Molecules/Article Card",
  component: ArticleCard,
} satisfies Meta<typeof ArticleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Sunset Beach, North Carolina",
    extract:
      "Sunset Beach is a seaside town in Brunswick County, North Carolina, United States. The population was 3,572 at the 2010 census, up from 1,824 in 2000 census. It is part of the Wilmington, NC Metropolitan Statistical Area and the southernmost beach in the state.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/SeagullOverWave.jpg/960px-SeagullOverWave.jpg",
  },
};
