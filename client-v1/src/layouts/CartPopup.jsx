import React, { useEffect } from "react";
import "../css/CartPopup.css";

const CartPopup = ({ cartItems, setCartItems, onClose }) => {
  useEffect(() => {
    // Add no-scroll class to body when the popup is open
    document.body.classList.add("no-scroll");

    // Remove no-scroll class when the popup is closed
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const handleQuantityChange = (index, change) => {
    const updatedCartItems = [...cartItems];
    const newQuantity = updatedCartItems[index].quantity + change;
    if (newQuantity > 0) {
      updatedCartItems[index].quantity = newQuantity;
      setCartItems(updatedCartItems);
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-popup-overlay">
      <div className="cart-popup-container">
        <button
          onClick={onClose}
          className="cart-popup-close-button"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="cart-popup-title">Cart</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="cart-popup-item">
              <img className="cart-popup-item-image" src={item.img} alt={item.title} />
              <div className="cart-popup-item-details">
                <h3 className="cart-popup-item-title">{item.title}</h3>
                <p className="cart-popup-item-price">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="cart-popup-item-quantity">
                <button
                  onClick={() => handleQuantityChange(index, -1)}
                  className="cart-popup-quantity-button"
                >
                  -
                </button>
                <span className="cart-popup-quantity">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(index, 1)}
                  className="cart-popup-quantity-button"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="cart-popup-remove-button"
                >
                  &times;
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="cart-popup-empty">Your cart is empty.</p>
        )}
        <div className="cart-popup-total">
          <h3>Total: ${totalPrice}</h3>
        </div>
        <button
          onClick={onClose}
          className="cart-popup-select-button"
        >
          Select Your Dining Preference
        </button>
      </div>
    </div>
  );
};

export default CartPopup;
