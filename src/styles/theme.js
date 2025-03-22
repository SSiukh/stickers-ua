import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#eb6424",
    },
    secondary: {
      main: "#f2e8cf",
    },
    text: {
      primary: "#f2e8cf",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            borderRadius: "8px",
            backgroundColor: "#f2e8cf1a",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#f2e8cf",
            },
            "&:hover fieldset": {
              borderColor: "#eb6424",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: "10px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: "#8f8989",
          },
        },
      },
    },
  },
});

export default theme;
