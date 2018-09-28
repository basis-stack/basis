import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const convertToMuiTheme = (basisTheme) => {

  const muiTheme = {

    palette: {

      primary: { main: basisTheme.primary },
      secondary: { main: basisTheme.secondary }
    }
  };

  if (basisTheme.appBar !== undefined) {

    muiTheme.overrides = {

      MuiAppBar: {
        colorPrimary: {
          backgroundColor: basisTheme.appBar
        }
      }
    };
  }

  return muiTheme;
};

const getMuiTheme = (themeConfig) => {

  if (themeConfig === undefined) {

    return createMuiTheme();
  }

  if ((themeConfig.palette !== undefined) || (themeConfig.overrides !== undefined)) {

    return createMuiTheme(themeConfig);
  }

  return createMuiTheme(convertToMuiTheme(themeConfig));
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