import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";

import ManyPackages from "./components/ManyPackage";
import AddPackage from "./components/AddPackage";
import Pkg from "./components/Package";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const getPackages = async () => {
      const packagesFromServer = await fetchPackages(
        "http://localhost:5000/packages",
      );
      setPackages(packagesFromServer);
    };
    getPackages();
  }, []);

  const fetchPackages = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  // Ajouter un forfais
  const addPackage = async (pkg) => {
    const res = await fetch("http://localhost:5000/packages", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(pkg),
    });
    const newPackage = await res.json();

    setPackages([...packages, newPackage]);
  };

  // Supprimer un forfais
  const deletePackage = async (id) => {
    await fetch(`http://localhost:5000/packages/${id}`, {
      method: "DELETE",
    });
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen font-sans">
        <Navigation />

        <main className="flex-grow">
          <div className="container mx-auto p-8 border-2 border-blue-200 mt-16 max-w-screen-md rounded-lg">
            <Header
              toggleForm={() => setShowAddPackage(!showAddPackage)}
              showAdd={showAddPackage}
            />
            {showAddPackage && <AddPackage onAdd={addPackage} />}
            <Routes>
              <Route
                path="/forfais"
                element={
                  <ManyPackages
                    Packages
                    packages={packages}
                    onDelete={deletePackage}
                  />
                }
              />
              <Route
                path="/forfais/:id"
                element={<Pkg setShowAddPackage={setShowAddPackage} />}
              />
              <Route
                path="/about"
                element={<About setShowAddPackage={setShowAddPackage} />}
              />
              <Route
                path="/"
                element={<Home setShowAddPackage={setShowAddPackage} />}
              />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
