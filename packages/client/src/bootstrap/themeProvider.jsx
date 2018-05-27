import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const getMuiTheme = (themeConfig) => {

  // TODO: Need to check if themeConfig is actually MUI theme config, and if so just use it

  const overrides = themeConfig !== undefined && themeConfig.appBar !== undefined ? {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: themeConfig.appBar
      }
    }
  } : {};

  return themeConfig === undefined ?
    createMuiTheme() :
    createMuiTheme({

      palette: {
        primary: { main: themeConfig.primary },
        secondary: { main: themeConfig.secondary }
      },
      overrides
    });
};

const ThemeProvider = ({ muiTheme, children }) => (

  <MuiThemeProvider theme={muiTheme}>
    { children }
  </MuiThemeProvider>
);

const mapDispatchToProps = dispatch => ({});
const mapStateToProps = state => ({

  muiTheme: getMuiTheme(state.core.theme)
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeProvider);