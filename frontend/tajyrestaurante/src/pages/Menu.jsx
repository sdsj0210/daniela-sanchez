import { useEffect, useState } from "react";
import { MenuSection } from "../components/MenuSection";

export const Menu = () => {
  const [menuData, setMenuData] = useState([]);
  const [vegan, setVegan] = useState(false);
  const [minSpicy, setMinSpicy] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const response = await fetch("/api/productos.php", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("No se pudo cargar el menú");
        }

        const productos = await response.json();

        const categorias = {};

        productos.forEach((producto) => {
          if (!categorias[producto.categoria_id]) {
            categorias[producto.categoria_id] = {
              title: producto.categoria,
              image: producto.imagen,
              items: [],
            };
          }

          categorias[producto.categoria_id].items.push({
            id: producto.id,
            name: producto.nombre,
            price: `${Number(producto.precio).toFixed(2)}€`,
            vegano: Boolean(Number(producto.vegano)),
            picante: Number(producto.picante),
          });
        });

        setMenuData(Object.values(categorias));
      } catch (error) {
        console.error("Error al cargar el menú:", error);
        setError("No se pudo cargar el menú.");
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  const filteredMenu = menuData.map((section) => ({
    ...section,
    items: section.items.filter((item) => {
      return (!vegan || item.vegano) && item.picante >= minSpicy;
    }),
  }));

  if (loading) {
    return (
      <main className="menu page-container">
        <p>Cargando menú...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="menu page-container">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="menu page-container">
      <div className="menu-filters">
        <label>
          <input
            type="checkbox"
            onChange={(e) => setVegan(e.target.checked)}
          />
          <span>Vegano 🌱</span>
        </label>

        <select onChange={(e) => setMinSpicy(Number(e.target.value))}>
          <option value="0">Todos 🌶️</option>
          <option value="1">Suave 🌶️</option>
          <option value="2">Medio 🌶️🌶️</option>
          <option value="3">Fuerte 🌶️🌶️🌶️</option>
        </select>
      </div>

      {filteredMenu
        .filter((section) => section.items.length > 0)
        .map((section) => (
          <MenuSection
            key={section.title}
            title={section.title}
            image={section.image}
            items={section.items}
          />
        ))}
    </main>
  );
};