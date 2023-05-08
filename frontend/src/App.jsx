import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AppContext, socket } from "./context/AppContext";

import "./App.css";
import MainRoute from "./routes/MainRoute";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
function App() {
  return (
    <>
      <AppContext.Provider value={{ socket }}>
        <Navbar />
        <MainRoute />
      </AppContext.Provider>
    </>
  );
}

export default App;
