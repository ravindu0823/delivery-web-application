import React, { useState } from "react";
import Button from "../layouts/Button";

const Popup = ({ dish, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 relative animate-slide-up">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
      >
        &times;
      </button>
      <h2 className="text-2xl font-semibold mb-4 text-center">{dish.title}</h2>
      <img
        className="w-full h-48 object-cover rounded-lg mb-4"
        src={dish.img}
        alt={dish.title}
      />
      <p className="mb-4 text-center">{dish.description}</p>
      <div className="flex justify-center mb-4">
        <h3 className="font-semibold text-lg text-gray-700">{dish.price}</h3>
      </div>
      <div className="flex justify-center">
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const DishesCard = (props) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleAddClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      <div className="w-full lg:w-1/4 p-6 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
        <img
          className="w-full h-48 object-cover rounded-t-lg transition-transform duration-200 hover:scale-110"
          src={props.img}
          alt="Dish Image"
        />
        <div className="p-4 space-y-4">
          <h3 className="font-semibold text-xl text-center text-gray-800">{props.title}</h3>
          <div className="flex justify-center space-x-1">
            <p>Seeni sambol, coconut sambol, katta sambol and curry leaf sambol with a basket of papadums</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
            <h3 className="font-semibold text-lg text-gray-700">{props.price}</h3>
            <Button
              title="Add"
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
              onClick={handleAddClick}
            />
          </div>
        </div>
      </div>
      {isPopupVisible && (
        <Popup
          dish={{
            title: props.title,
            img: props.img,
            description: "Seeni sambol, coconut sambol, katta sambol and curry leaf sambol with a basket of papadums",
            price: props.price,
          }}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default DishesCard;
