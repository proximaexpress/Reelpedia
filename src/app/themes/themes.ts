import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  cssVariables: true,
});

const darkTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    divider: "rgba(255, 255, 255, 0.2)",
    background: {
      paper: "rgba(33, 33, 33, 1)",
    },
  },
});

export { lightTheme, darkTheme };
