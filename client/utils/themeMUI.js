import { createTheme } from '@mui/material/styles';

const backgroundColor = '#1d2639';
const textColor = '#d1d1d1';
const borderColor = '#313a49';
const secondaryText = '#a0a0a0';
const primary = '#3f5cb8';

const theme = createTheme({
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: secondaryText,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: secondaryText,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: textColor,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: secondaryText,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: secondaryText,
          },
        },
      },
    },
  },
});

export default theme;
