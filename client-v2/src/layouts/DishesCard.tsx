import React, { useState, useEffect } from "react";
import Button from "../layouts/Button";
import CartPopup from "./CartPopup";
import "../styles/animate-slide-up.css";
import "../styles/custom-styles.css";
import "../styles/navbar-popup.css";
import { CartItem, Dish, DishesCardProps, PopupProps } from "../utils/Props";

// Popup Component
const Popup: React.FC<PopupProps> = ({
  dish,
  quantity,
  setQuantity,
  onClose,
  onAddToCart,
  productOptions,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-2 relative animate-slide-up mt-4 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-[#FF0000] hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-300"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {dish.title}
        </h2>
        <img
          className="w-full h-48 object-cover rounded-lg mb-4"
          src={dish.img}
          alt={dish.title}
        />
        <p className="mb-4 text-center">{dish.description}</p>
        <div className="text-center font-bold mb-3">OPTIONS</div>
        {productOptions && productOptions.length > 0 ? (
          <div className="mb-4">
            {productOptions.map((option) => (
              <div
                key={option.name}
                className="flex flex-col space-y-3 mb-4 custom-radio"
              >
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="selection"
                    value={option.name}
                    checked={selectedOption === option.name}
                    onChange={() => handleRadioChange(option.name)}
                  />
                  <div className="radio-content">
                    <div className="radio-text">
                      <span className="text-sm">{option.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="discount-price-radio b">
                        Rs. {option.price}
                      </span>
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No options available.</p>
        )}
        {/* <div className="flex justify-center items-center space-x-4 mb-4">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              className="bg-[#00CC05] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#000000] transition-colors duration-300"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-[#009604] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#000000] transition-colors duration-300"
            >
              +
            </button>
          </div> */}
      </div>
      {/* <div className="flex justify-center space-x-4">
          <button
            onClick={() => onAddToCart(dish, quantity)}
            className="bg-[#007103] text-white px-8 py-2 rounded-full hover:bg-[#003101] transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div> */}
    </div>
  );
};

// DishesCard Component
const DishesCard: React.FC<DishesCardProps> = (props) => {
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>(false);
  const [isCartPopupVisible, setIsCartPopupVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isPopupVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isPopupVisible]);

  const handleAddClick = async () => {
    // const productData = await axiosInstance.get(ORGANIZATION_DATA_GET_PRODUCT_BY_ID)
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleAddToCart = (dish: Dish, quantity: number) => {
    const updatedCartItems = [...cartItems, { ...dish, quantity }];
    setCartItems(updatedCartItems);
    setIsPopupVisible(false);
    setSuccessMessage("Successfully added to cart");
    setTimeout(() => setSuccessMessage(""), 3000);
    setIsNavbarVisible(true);
  };

  const handleNavbarClick = () => {
    setIsCartPopupVisible(!isCartPopupVisible);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <>
      <div
        id={props.id}
        className="w-full lg:w-150 p-6 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 flex flex-col justify-between"
      >
        <div className="flex-grow">
          <img
            className="w-full h-48 object-cover rounded-t-lg transition-transform duration-200 hover:scale-110"
            src={props.img}
            alt="Dish Image"
          />
          <div className="p-4 space-y-4">
            <h3 className="font-semibold text-xl text-center text-gray-800">
              {props.title}
            </h3>
            <p className="text-center">{props.description}</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-lg text-gray-700 mb-2">
            RM {props.price}
          </h3>
          <Button
            title="View"
            className="w-auto bg-green-500 text-white hover:bg-green-800 transition-colors duration-300"
            onClick={handleAddClick}
          />
        </div>
      </div>

      {isPopupVisible && (
        <Popup
          dish={{
            id: props.id!,
            title: props.title!,
            img: props.img!,
            description: props.description!,
            price: props.price!,
          }}
          quantity={quantity}
          setQuantity={setQuantity}
          onClose={handleClosePopup}
          onAddToCart={handleAddToCart}
          productOptions={props.productOptions}
        />
      )}

      {successMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
          <span className="text-lg">&#10004;</span> {/* Check mark */}
          <span className="ml-2">{successMessage}</span>
        </div>
      )}

      {isNavbarVisible && (
        <div
          className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-between items-center transition-transform duration-300 ${
            isNavbarVisible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center space-x-4">
            <span>Items: {totalItems}</span>
            <span>Total: ${totalPrice}</span>
          </div>
          <button
            onClick={handleNavbarClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
          >
            View Cart
          </button>
        </div>
      )}

      {isCartPopupVisible && (
        <CartPopup
          cartItems={cartItems}
          setCartItems={setCartItems}
          onClose={() => setIsCartPopupVisible(false)}
        />
      )}
    </>
  );
};

export default DishesCard;
