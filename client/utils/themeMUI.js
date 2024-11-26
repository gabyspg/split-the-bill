import { createTheme } from '@mui/material/styles';

// CSS Variable Mappings
const primaryColor = '#4354b5'; // $primary
const backgroundColor = '#121212'; // $background
const secondaryColor = '#1f2532'; // $secondary
const primaryTextColor = '#e0e0e0'; // $primaryText
const primaryAccentColor = '#3f5cb8'; // $primaryAccent
const primaryAccentBorderColor = '#313a49'; // $primaryAccentBorder
const inputFieldBackgroundColor = '#1d2639'; // $inputFieldBackground
const secondaryTextColor = '#a0a0a0'; // $secondaryText
const secondaryAccentColor = '#a6a6a6'; // $secondaryAccent
const secondaryAccentBorderColor = '#c1c1c1'; // $secondaryAccentBorder
const deleteColor = '#e53935'; //$deleteColor

// MUI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      light: primaryAccentColor,
      dark: secondaryColor,
      contrastText: primaryTextColor,
    },
    secondary: {
      main: secondaryAccentColor,
      light: secondaryAccentBorderColor,
      dark: secondaryTextColor,
      contrastText: backgroundColor,
    },
    background: {
      default: backgroundColor,
      paper: inputFieldBackgroundColor,
    },
    text: {
      primary: primaryTextColor,
      secondary: secondaryTextColor,
    },
    delete: {
      main: deleteColor,
    },
    divider: primaryAccentBorderColor,
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: inputFieldBackgroundColor,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: primaryAccentBorderColor,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: secondaryTextColor,
        },
      },
    },
  },
});

export default theme;
