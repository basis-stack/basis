import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import { connect } from 'react-redux';

const convertToMuiTheme = basisTheme => {

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

const getMuiTheme = themeConfig => {

  if (themeConfig === undefined) {

    return createMuiTheme();
  }

  if ((themeConfig.palette !== undefined) ||
      (themeConfig.overrides !== undefined) ||
      (themeConfig.typography !== undefined) ||
      (themeConfig.spacing !== undefined)) {

    return createMuiTheme(themeConfig);
  }

  return createMuiTheme(convertToMuiTheme(themeConfig));
};

const ThemeProvider = ({ themeConfig, children }) => (

  <MuiThemeProvider theme={getMuiTheme(themeConfig)}>
    { children }
  </MuiThemeProvider>
);

export default ThemeProvider;

// TODO: Temporarily disabled sourcing the theme from redux state due to a performance issue
//       with re-rendering the entire tree unnecessarily. Need to think how better to do this.

// const mapDispatchToProps = dispatch => ({});
// const mapStateToProps = state => ({

//   muiTheme: getMuiTheme(state.core.theme)
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ThemeProvider);