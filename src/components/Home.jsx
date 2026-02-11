import { Link } from "react-router-dom";
import { useEffect } from "react";

const Home = ({ setShowAddPackage }) => {
  useEffect(() => {
    setShowAddPackage(false);
  }, [setShowAddPackage]);

  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-sky-600 mb-4">
        Bienvenue chez Travel Agency
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Découvrez nos forfaits touristiques exclusifs et partez à l’aventure!
      </p>
      <Link
        to="/forfais"
        className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg transition"
      >
        Voir les forfaits
      </Link>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="font-bold text-xl mb-2">City Breaks</h3>
          <p>
            Profitez de courts séjours urbains et découvrez les grandes villes
            européennes.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="font-bold text-xl mb-2">Aventures</h3>
          <p>
            Explorez la nature et vivez des expériences uniques autour du monde.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="font-bold text-xl mb-2">Plages & Relaxation</h3>
          <p>
            Détendez-vous sur des plages paradisiaques et profitez du soleil.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
