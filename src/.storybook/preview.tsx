import { useMemo } from "react";

import type { Preview } from "@storybook/react-vite";

import CssBaseline from "@mui/material/CssBaseline";
import { type Theme, ThemeProvider } from "@mui/material/styles";

import { darkTheme, lightTheme } from "../app/themes/themes";

// https://storybook.js.org/blog/material-ui-in-storybook/
export const globalTypes = {
  theme: {
    name: "Theme",
    title: "Theme",
    description: "Theme for your components",
    defaultValue: "light",
    toolbar: {
      icon: "paintbrush",
      dynamicTitle: true,
      items: [
        { value: "light", left: "☀️", title: "Light mode" },
        { value: "dark", left: "🌙", title: "Dark mode" },
      ],
    },
  },
};

// Add your theme configurations to an object that you can
// pull your desired theme from.
const THEMES = {
  light: lightTheme,
  dark: darkTheme,
};

export const withMuiTheme = (Story, context) => {
  // The theme global we just declared
  const { theme: themeKey } = context.globals;

  // Only recompute the theme if the themeKey changes
  const theme: Theme = useMemo(
    () => THEMES[themeKey] || THEMES["light"],
    [themeKey],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;

export const decorators = [withMuiTheme];
