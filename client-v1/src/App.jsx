import React, { useState, useEffect, createContext, useContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Dishes from "./components/Dishes";
import Reviews from "./components/Review";
import Footer from "./components/Footer";
import { getValidToken } from "./utils/tokenUtils";

// Create a Context for authentication
const AuthContext = createContext();

const App = () => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const accessToken = await getValidToken();
        if (accessToken) {
          setToken(accessToken);
        } else {
          console.error('Access token not found');
        }
      } catch (error) {
        console.error('Error fetching access token:', error.message || error);
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">Error: {error}</div>;

  return (
    <AuthContext.Provider value={{ token }}>
      <div>
        <Navbar />
        <main>
          <section id="home">
            <Home />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="dishes">
            <Dishes />
          </section>
          <section id="review">
            <Reviews />
          </section>
        </main>
        <br /> <br />
        <Footer />
      </div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default App;
