import React from "react";
import DishesCard from "../layouts/DishesCard";
import img1 from "../assets/img/dish.png";

const Menu = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center lg:px-32 px-5">
      <h1 className=" text-4xl lg:text-5xl font-semibold text-left pt-24 pb-10 text-gray-800">
      SOUPS
      </h1>

      <div className=" flex flex-wrap gap-8 justify-center">
        {/* <DishesCard img={img1} title="SRI LANKAN CRAB" price="RM144.00" />
        <DishesCard img={img1} title="MUTTON BONE & MARROW" price="RM144.00" />
        <DishesCard img={img1} title="KANDYAN PACKETS" price="RM144.00" />
        <DishesCard img={img1} title="SRI LANKAN CRAB" price="RM144.00" />
        <DishesCard img={img1} title="MUTTON BONE & MARROW" price="RM144.00" />
        <DishesCard img={img1} title="KANDYAN PACKETS" price="RM144.00" /> */}
        
      </div>
    </div>
  );
};

export default Menu;
