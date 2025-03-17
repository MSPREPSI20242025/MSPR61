import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Visualisation from "./pages/Visualisation";
import Donnees from "./pages/Donnees";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Visualisation />} />
        <Route path="/donnees" element={<Donnees />} />
      </Routes>
    </>
  );
}
