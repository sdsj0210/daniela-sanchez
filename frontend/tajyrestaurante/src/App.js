import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { Reservation } from "./pages/Reservation";
import { Restaurant } from "./pages/Restaurant";
import { Menu } from "./pages/Menu";
import { PoliticaCookies } from "./pages/legal/PoliticaCookies";
import { PoliticaPrivacidad } from "./pages/legal/PoliticaPrivacidad";
import { AvisoLegal } from "./pages/legal/AvisoLegal";
import { MainLayout } from "./layout/MainLayout";
import { LegalLayout } from "./layout/LegalLayout";
import { ScrollToTop } from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";

export const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="contact" element={<Contact />} />
            <Route path="restaurant" element={<Restaurant />} />
            <Route path="reservation" element={<Reservation />} />
          </Route>

          <Route element={<LegalLayout />}>
            <Route
              path="/politica-privacidad"
              element={<PoliticaPrivacidad />}
            />
            <Route path="/politica-cookies" element={<PoliticaCookies />} />
            <Route path="/aviso-legal" element={<AvisoLegal />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};
