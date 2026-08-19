import { useCart } from "../context/CartContext";

export const MenuSection = ({ title, image, items }) => {
  const { addToCart } = useCart();

  const handleAdd = (item) => {
    const product = {
      id: crypto.randomUUID(),
      name: item.name,
      price: item.price,
    };
    addToCart(product);
  };

  return (
    <div className="menu-container">
      <h2 className="title">{title}</h2>

      <section className="menu-section">
        <img className="img-menu" src={image} alt={title} />

        <ul className="menu-element">
          {items.map((item, index) => (
            <li key={index} className="menu-item">
              <div className="menu-info">
                <span className="menu-name">{item.name}</span>
                <span className="price">{item.price}</span>
              </div>

              <button className="btn-cart" onClick={() => handleAdd(item)}>
                Añadir
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
