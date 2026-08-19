import { useCart } from "../context/CartContext";

export const Cart = ({ showCart }) => {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems
    .reduce((acc, item) => acc + parseFloat(item.price.replace("€", "")), 0)
    .toFixed(2);

  if (!showCart) return null;

  return (
    <div className="cart-dropdown">
      {cartItems.length === 0 ? (
        <p className="empty-cart">Carrito vacío</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <span>{item.price}</span>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                🗑️
              </button>
            </div>
          ))}

          <div className="cart-total">Total: {total}€</div>
        </>
      )}
    </div>
  );
};
