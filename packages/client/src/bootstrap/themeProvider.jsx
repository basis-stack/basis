import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { connect } from 'react-redux';

const getMuiTheme = themeConfig => createMuiTheme({

  // TODO: if themeConfig.appBar exists, then add components/appBar section
  palette: {
    primary: { main: themeConfig.primary },
    secondary: { main: themeConfig.secondary }
  }
});

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