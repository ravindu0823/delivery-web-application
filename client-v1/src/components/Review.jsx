import React from "react";
import ReviewCard from "../layouts/ReviewCard";
import img from "../assets/img/pic.jpg";

const Review = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center md:px-32 px-5">
      <h1 className="text-4xl font-semibold text-center lg:pt-6 pt-24 pb-2">
        Customer's Review
      </h1>
      <div className="flex flex-wrap justify-center gap-5 mt-5">
        <ReviewCard img={img} name="Amantha Keshan" />
        {/* Uncomment the following if you want additional cards */}
        {/* <ReviewCard img={img} name="Amantha Keshan" />
        <ReviewCard img={img} name="Amantha Keshan" />
        <ReviewCard img={img} name="Amantha Keshan" /> */}
      </div>
    </div>
  );
};

export default Review;
