import React from "react";
import { ThemeProvider } from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import Header from "./Header";
import Theme from "../Styles/Theme";
import GlobalStyles from "../Styles/GlobalStyles";

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <Header />
          <Routes />
        </Router>
      </>
    </ThemeProvider>
  );
};

export default App;
