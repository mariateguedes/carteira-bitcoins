import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthenticationProvider from "./authentication/AuthenticationProvider";
import Routes from "./routes";

function App() {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

export default App;
