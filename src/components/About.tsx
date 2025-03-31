import img from "../assets/img/dish.png";
import Button from "../layouts/Button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center lg:px-32 px-5 py-10 bg-gray-100">
      <div className="lg:w-1/2 flex justify-center lg:justify-start mb-8 lg:mb-0">
        <img
          src={img}
          alt="About"
          className="w-full max-w-lg rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="lg:w-2/3 flex flex-col space-y-6 lg:space-y-8 text-center lg:text-left">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
          FLAVOURS OF CEYLON
        </h1>
        <p className="text-lg text-gray-700">
          Our Crab dishes are prepared using the finest Sri Lankan spices and a
          special recipe developed by our executive Chef Raj and Chef Dinushka.
          Serendib Restaurant is where you can enjoy the finest Crab dishes in
          Malaysia.
        </p>
        <p className="text-lg text-gray-700">
          Our menu is curated to tantalize your taste buds with flavors from the
          North to the South and East to the West of the Island nation Sri
          Lanka.
        </p>
        <div className="flex justify-center lg:justify-start">
          <Button
            title="Learn More"
            className="bg-blue-600 text-black hover:bg-blue-700 transition-colors duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
