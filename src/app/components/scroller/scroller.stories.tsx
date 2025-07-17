import type { Meta, StoryObj } from "@storybook/react-vite";

import { Box, useTheme } from "@mui/material";

import Scroller from "./scroller";

const meta = {
  title: "Organisms/Scroller",
  component: Scroller,
  args: {
    sx: {
      width: "100%",
    },
  },
  decorators: [
    (Story) => {
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
          <Story />
        </Box>
      );
    },
  ],
} satisfies Meta<typeof Scroller>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
