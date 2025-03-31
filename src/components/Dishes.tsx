import { useState, useEffect, useContext } from "react";
import DishesCard from "../layouts/DishesCard";
import { AuthContext } from "../contexts/AuthContext";
import { axiosInstance } from "../api/config";
import { createGetCategoryUrl, getProductUrl } from "../api/authController";
import { CustomLoadingPage } from "../pages/LoadingPage";
import { useParams } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  createUtc: string;
  organizationId: string;
  status: number;
  userId: string;
}

interface ProductOptionsProps {
  name: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  productOptions: ProductOptionsProps[];
}

interface ProductsMap {
  [categoryId: string]: Product[];
}

const Dishes = () => {
  const params = useParams();
  const ORGANIZATION: string = params.orgId!;

  const { user } = useContext(AuthContext)!;
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductsMap>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);

        const fetchedProducts = await fetchProducts(fetchedCategories);
        setProducts(fetchedProducts);
      } catch (error) {
        setError((error as Error).message);
        console.error("Error fetching categories or products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, [user?.accessToken]);

  const fetchCategories = async (): Promise<Category[]> => {
    const response = await axiosInstance.get<Category[]>(
      createGetCategoryUrl(ORGANIZATION),
      {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      }
    );
    return response.data;
  };

  const fetchProducts = async (
    categories: Category[]
  ): Promise<ProductsMap> => {
    const productPromises = categories.map(async (category) => {
      try {
        const response = await axiosInstance.get<Product[]>(
          getProductUrl(ORGANIZATION, category.id),
          {
            headers: { Authorization: `Bearer ${user?.accessToken}` },
          }
        );
        return { categoryId: category.id, products: response.data };
      } catch (error) {
        console.error(
          `Error fetching products for category ${category.id}:`,
          error
        );
        return { categoryId: category.id, products: [] };
      }
    });

    const productDataArray = await Promise.all(productPromises);
    return productDataArray.reduce((acc, { categoryId, products }) => {
      acc[categoryId] = products;
      return acc;
    }, {} as ProductsMap);
  };

  if (loading) return <CustomLoadingPage />;
  if (error)
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;

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
            <CategorySection
              key={category.id}
              category={category}
              products={products[category.id] || []}
            />
          ))
        )}
      </div>
    </div>
  );
};

const CategorySection = ({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-8 mx-auto w-full lg:w-3/4">
    <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-4 text-center">
      {category.name}
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.length > 0 ? (
        products.map((product) => (
          <DishesCard
            key={product.id}
            img={product.image}
            title={product.name}
            description={product.description}
            price={product.price}
            productOptions={product.productOptions} // Passing productOptions to DishesCard
          />
        ))
      ) : (
        <p className="text-center text-gray-600 col-span-full">
          No products available.
        </p>
      )}
    </div>
  </div>
);

export default Dishes;
