import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Button, Typography } from "@mui/material";

import "./App.css";
import MainRoute from "./routes/MainRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <MainRoute />
    </>
  );
}

export default App;
