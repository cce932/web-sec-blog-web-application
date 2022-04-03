import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import theme from "./theme";
import { CssBaseline } from "@mui/material";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          {/* <Route index element={<Home />} /> */}
          {/* <Route path="teams" element={<Teams />}>
              <Route path=":teamId" element={<Team />} />
              <Route path="new" element={<NewTeamForm />} />
              <Route index element={<LeagueStandings />} />
            </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
