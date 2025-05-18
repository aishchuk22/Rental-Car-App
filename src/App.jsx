import { BrowserRouter, Routes, Route } from "react-router-dom";

import CarDetailsPage from "./pages/CarDetailsPage/CarDetailsPage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CarDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
