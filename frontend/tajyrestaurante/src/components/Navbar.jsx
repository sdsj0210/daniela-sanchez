import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Cart } from "./Cart";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const { cartItems } = useCart();

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/assets/Logo.png" alt="Tajy logo" />
        </Link>
      </div>

      <nav className={`navbar-links ${open ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/menu" onClick={() => setOpen(false)}>
              Menú
            </Link>
          </li>
          <li>
            <Link to="/restaurant" onClick={() => setOpen(false)}>
              Restaurante
            </Link>
          </li>
          <li>
            <Link to="/reservation" onClick={() => setOpen(false)}>
              Reservas
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setOpen(false)}>
              Contacto
            </Link>
          </li>
        </ul>
      </nav>
      <div className="nav-actions">
        {/* 🛒 ICONO */}
        <div className="cart-icon" onClick={() => setShowCart(!showCart)}>
          🛒
          {cartItems.length > 0 && (
            <span className="cart-badge">{cartItems.length}</span>
          )}
        </div>

        {/* 🛒 COMPONENTE */}
        <Cart showCart={showCart} />

        {/* MENU */}
        <button className="menu-toggle" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>
    </header>
  );
};
