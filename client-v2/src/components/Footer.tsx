import { FC } from "react";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";

const Footer: FC = () => {
  return (
    <div className="bg-green-900 text-white rounded-t-3xl mt-8 md:mt-0">
      {/* Mobile Layout */}
      <div className="flex flex-col md:hidden p-4 border-t-4 border-brightColor">
        {/* Logo and Description */}
        <div className="text-center mb-6">
          <h1 className="font-bold text-xl mb-2">Techwire Lanka</h1>
          <p className="text-xs leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quia
            porro tenetur? Ad, itaque minus atque laboriosam similique.
          </p>
        </div>

        {/* Links and Menu Section */}
        <div className="text-center mb-6">
          <h2 className="font-medium text-lg mb-2">Links</h2>
          <nav className="flex flex-col gap-2 mb-6">
            {["Dishes", "About", "Menu", "Reviews"].map((item, index) => (
              <a
                key={index}
                className="hover:text-brightColor transition-colors duration-300 text-sm"
                href="/"
              >
                {item}
              </a>
            ))}
          </nav>
          <h2 className="font-medium text-lg mb-2">Menu</h2>
          <nav className="flex flex-col gap-2">
            {["Our Dishes", "Premium Menu"].map((item, index) => (
              <a
                key={index}
                className="hover:text-brightColor transition-colors duration-300 text-sm"
                href="/"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact Us Section */}
        <div className="text-center mb-6">
          <h2 className="font-medium text-lg mb-2">Contact Us</h2>
          <nav className="flex flex-col gap-2">
            <a
              className="hover:text-brightColor transition-colors duration-300 text-sm"
              href="mailto:TechwireLanka@gmail.com"
            >
              TechwireLanka@gmail.com
            </a>
            <a
              className="hover:text-brightColor transition-colors duration-300 text-sm"
              href="tel:+94717083416"
            >
              +94 717 083 416
            </a>
            <a
              className="hover:text-brightColor transition-colors duration-300 text-sm"
              href="/"
            >
              Social Media
            </a>
          </nav>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col md:flex-row justify-between p-8 md:px-16 px-5 border-t-4 border-brightColor">
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h1 className="font-bold text-2xl mb-4">Techwire Lanka</h1>
          <p className="text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quia
            porro tenetur? Ad, itaque minus atque laboriosam similique
            reprehenderit sequi perferendis ducimus vel accusantium beatae! Cum
            est a excepturi recusandae!
          </p>
        </div>
        <div className="mb-6 md:mb-0">
          <h1 className="font-medium text-xl mb-4">Links</h1>
          <nav className="flex flex-col gap-2">
            {["Dishes", "About", "Menu", "Reviews"].map((item, index) => (
              <a
                key={index}
                className="hover:text-brightColor transition-colors duration-300 cursor-pointer"
                href="/"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div className="mb-6 md:mb-0">
          <h1 className="font-medium text-xl mb-4">Menu</h1>
          <nav className="flex flex-col gap-2">
            {["Our Dishes", "Premium Menu"].map((item, index) => (
              <a
                key={index}
                className="hover:text-brightColor transition-colors duration-300 cursor-pointer"
                href="/"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <h1 className="font-medium text-xl mb-4">Contact Us</h1>
          <nav className="flex flex-col gap-2">
            <a
              className="hover:text-brightColor transition-colors duration-300 cursor-pointer"
              href="mailto:TechwireLanka@gmail.com"
            >
              TechwireLanka@gmail.com
            </a>
            <a
              className="hover:text-brightColor transition-colors duration-300 cursor-pointer"
              href="tel:+94717083416"
            >
              +94 717 083 416
            </a>
            <a
              className="hover:text-brightColor transition-colors duration-300 cursor-pointer"
              href="/"
            >
              Social Media
            </a>
          </nav>
        </div>
      </div>

      {/* Social Media and Footer Text */}
      <div className="bg-green-950 py-4 text-center border-t-2 border-gray-600">
        <div className="flex justify-center mb-4">
          <a
            href="/"
            className="mx-2 text-gray-300 hover:text-brightColor transition-colors duration-300"
          >
            <BsFacebook size={20} />
          </a>
          <a
            href="/"
            className="mx-2 text-gray-300 hover:text-brightColor transition-colors duration-300"
          >
            <RiTwitterXFill size={20} />
          </a>
          <a
            href="/"
            className="mx-2 text-gray-300 hover:text-brightColor transition-colors duration-300"
          >
            <BsInstagram size={20} />
          </a>
        </div>
        <p className="text-xs">
          &copy; {new Date().getFullYear()} developed by
          <span className="text-brightColor"> Techwire Lanka Pvt Ltd</span> |
          All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
