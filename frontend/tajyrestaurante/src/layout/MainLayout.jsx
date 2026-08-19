import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Copyright } from "../components/Copyright";
import { ChatWidget } from "../components/ChatWidget";
import { Cookies } from "../components/Cookies";

export const MainLayout = () => {
  return (
    <div className="layout">
      <Navbar />

      <main className="main-content">
        <Outlet />
        <Cookies />
      </main>

      <ChatWidget />
      <Footer />
      <Copyright />
    </div>
  );
};
