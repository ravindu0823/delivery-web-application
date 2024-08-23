import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-scroll";
import Button from "../layouts/Button";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import SignIn from "./SignIn";
import Register from "./Register";
import { AuthContext } from "../contexts/AuthContext";
import { axiosInstance, ORGANIZATION } from "../api/config";
import { createGetCategoryUrlWithPageLimit } from "../api/authController";

interface Category {
  id: string;
  name: string;
  createUtc: string;
  organizationId: string;
  // products: any[];
  status: number;
  userId: string;
}

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const [menu, setMenu] = useState<boolean>(false);
  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  const { user } = authContext!;

  console.log(user?.accessToken);

  useEffect(() => {
    const fetchCategories = async () => {
      if (loading || !hasMore) return; // Prevent multiple fetches

      setLoading(true);

      try {
        const response = await axiosInstance.get(
          createGetCategoryUrlWithPageLimit(ORGANIZATION, page.toString()),
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          }
        );

        const data: Category[] = await response.data;

        // Avoid duplicating categories
        setCategories((prev) => {
          const newCategories = data.filter(
            (category) => !prev.some((item) => item.id === category.id)
          );
          return [...prev, ...newCategories];
        });

        if (data.length < 6) setHasMore(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [page, user?.accessToken]);

  const handleScroll = () => {
    if (
      dropdownRef.current &&
      dropdownRef.current.scrollTop + dropdownRef.current.clientHeight >=
        dropdownRef.current.scrollHeight
    ) {
      if (hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    }
  };

  const handleMenuToggle = () => {
    setMenu((prevMenu) => !prevMenu);
  };

  const toggleSignIn = () => {
    setShowSignIn((prev) => !prev);
    setShowRegister(false);
  };

  const closeAuthModals = () => {
    setShowSignIn(false);
    setShowRegister(false);
  };

  return (
    <div className="fixed w-full top-0 left-0 z-50 bg-white shadow-md">
      <div className="flex flex-row justify-between p-5 md:px-32 px-5">
        <div className="flex flex-row items-center cursor-pointer">
          <h1 className="text-xl font-semibold">LOGO</h1>
        </div>

        <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
          >
            Home
          </Link>

          <div className="relative group">
            <div className="flex items-center gap-1">
              <Link
                to="dishes"
                spy={true}
                smooth={true}
                duration={500}
                className="hover:text-brightColor transition-all cursor-pointer"
              >
                Dishes
              </Link>
              <BiChevronDown className="cursor-pointer" size={25} />
            </div>

            <ul
              ref={dropdownRef}
              className="absolute hidden space-y-0 group-hover:block bg-white border border-gray-300 rounded-lg p-5 shadow-lg transition-all duration-300 ease-in-out overflow-y-auto"
              style={{ width: "300px", maxHeight: "580px" }}
              onScroll={handleScroll}
            >
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li
                    key={category.id}
                    className="hover:bg-blue-100 transition-colors duration-300 ease-in-out rounded-lg"
                  >
                    <Link
                      to={`dishes-${category.name}`}
                      spy={true}
                      smooth={true}
                      duration={500}
                      className="text-gray-800 hover:text-blue-600 transition-all cursor-pointer block px-4 py-2"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-600">No categories found</li>
              )}
              {!hasMore && (
                <li className="text-gray-600">No more categories</li>
              )}
            </ul>
          </div>

          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
          >
            About
          </Link>

          <Link
            to="menu"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
          >
            Menu
          </Link>

          <Link
            to="review"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
          >
            Reviews
          </Link>

          <Button title="Sign In" onClick={toggleSignIn} />
        </nav>

        <div className="md:hidden flex items-center">
          {menu ? (
            <AiOutlineClose size={25} onClick={handleMenuToggle} />
          ) : (
            <AiOutlineMenuUnfold size={25} onClick={handleMenuToggle} />
          )}
        </div>
      </div>

      {menu && (
        <div className="fixed top-0 right-0 bg-white shadow-md w-full h-screen flex flex-col items-center justify-center z-50">
          <div className="flex flex-col items-center gap-8">
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className="text-xl font-semibold hover:text-brightColor transition-all"
              onClick={handleMenuToggle}
            >
              Home
            </Link>

            <div className="relative group">
              <div className="flex items-center gap-1">
                <Link
                  to="dishes"
                  spy={true}
                  smooth={true}
                  duration={500}
                  className="text-xl font-semibold hover:text-brightColor transition-all"
                  onClick={handleMenuToggle}
                >
                  Dishes
                </Link>
                <BiChevronDown className="cursor-pointer" size={25} />
              </div>

              <ul
                ref={dropdownRef}
                className="absolute hidden space-y-2 group-hover:block bg-white border border-gray-300 rounded-lg p-5 shadow-lg transition-all duration-300 ease-in-out overflow-y-auto"
                style={{ width: "250px", maxHeight: "300px" }}
                onScroll={handleScroll}
              >
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li
                      key={category.id}
                      className="hover:bg-blue-100 transition-colors duration-300 ease-in-out rounded-lg"
                    >
                      <Link
                        to={`dishes-${category.name}`}
                        spy={true}
                        smooth={true}
                        duration={500}
                        className="text-gray-800 hover:text-blue-600 transition-all block px-4 py-2"
                        onClick={handleMenuToggle}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-600">No categories found</li>
                )}
                {!hasMore && (
                  <li className="text-gray-600">No more categories</li>
                )}
              </ul>
            </div>

            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className="text-xl font-semibold hover:text-brightColor transition-all"
              onClick={handleMenuToggle}
            >
              About
            </Link>

            <Link
              to="menu"
              spy={true}
              smooth={true}
              duration={500}
              className="text-xl font-semibold hover:text-brightColor transition-all"
              onClick={handleMenuToggle}
            >
              Menu
            </Link>

            <Link
              to="review"
              spy={true}
              smooth={true}
              duration={500}
              className="text-xl font-semibold hover:text-brightColor transition-all"
              onClick={handleMenuToggle}
            >
              Reviews
            </Link>

            <Button
              title="Sign In"
              onClick={() => {
                handleMenuToggle();
                toggleSignIn();
              }}
            />
          </div>
        </div>
      )}

      {showSignIn && <SignIn onClose={closeAuthModals} />}
      {showRegister && <Register onClose={closeAuthModals} />}
    </div>
  );
};

export default Navbar;
