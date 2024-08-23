import React, { useState, useEffect } from "react";
import DishesCard from "../layouts/DishesCard";
import { useAuth } from "../App";
import { ORGANIZATION } from "../utils/tokenUtils"; 


const Dishes = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      if (!token) {
        setError("No token available.");
        setLoading(false);
        return;
      }

      try {
        const categoryResponse = await fetch(
          `https://checkmateapi20240716235602.azurewebsites.net/get-category?Organization=${ORGANIZATION}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!categoryResponse.ok) {
          if (categoryResponse.status === 401) {
            throw new Error("Unauthorized access. Please log in again.");
          }
          throw new Error(`HTTP error! Status: ${categoryResponse.status}`);
        }

        const categoryData = await categoryResponse.json();
        setCategories(categoryData);

        const productPromises = categoryData.map(async (category) => {
          try {
            const productResponse = await fetch(
              `https://checkmateapi20240716235602.azurewebsites.net/get-productlist?Organization=${ORGANIZATION}&CategoryIndex=${category.id}`, // Use ORGANIZATION constant
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (!productResponse.ok) {
              if (productResponse.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
              }
              throw new Error(`HTTP error! Status: ${productResponse.status}`);
            }

            const responseText = await productResponse.text();
            const productData = responseText ? JSON.parse(responseText) : [];
            return { categoryId: category.id, products: productData };
          } catch (error) {
            console.error(`Error fetching products for category ${category.id}:`, error);
            return { categoryId: category.id, products: [] };
          }
        });

        const productDataArray = await Promise.all(productPromises);
        const productsMap = productDataArray.reduce((acc, { categoryId, products }) => {
          acc[categoryId] = products;
          return acc;
        }, {});

        setProducts(productsMap);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching categories or products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, [token]);

  if (loading) {
    return <div className="text-center py-10">Loading dishes...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 py-10 px-4 lg:px-32">
      <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-10 text-center">
        Our Dishes
      </h1>

      <div className="flex flex-col gap-16">
        {categories.length === 0 ? (
          <p className="text-center text-gray-600">No categories available.</p>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-6 rounded-lg shadow-lg mb-8 mx-auto w-full lg:w-3/4"
            >
              <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-4 text-center">
                {category.name}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products[category.id] && products[category.id].length > 0 ? (
                  products[category.id].map((product) => (
                    <DishesCard
                      key={product.id}
                      img={product.image}
                      title={product.name}
                      description={product.description}
                      price={product.price}
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-600 col-span-full">
                    No products available.
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dishes;
