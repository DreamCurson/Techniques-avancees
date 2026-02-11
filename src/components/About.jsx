import { Link } from "react-router-dom";
import { useEffect } from "react";

const About = ({ setShowAddPackage }) => {
  useEffect(() => {
    setShowAddPackage(false);
  }, [setShowAddPackage]);

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-10">
      <h2 className="text-3xl font-bold text-sky-600 mb-4">
        À propos de Travel Agency
      </h2>
      <p className="text-gray-700 mb-6">
        Version 1.0 – Découvrez nos services et forfaits touristiques.
      </p>

      <Link
        to="/forfais"
        className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-5 rounded-lg transition"
      >
        Retour aux forfaits
      </Link>
    </div>
  );
};

export default About;
