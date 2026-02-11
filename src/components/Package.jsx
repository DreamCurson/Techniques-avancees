import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Pkg = ({ setShowAddPackage }) => {
  const { id } = useParams();
  const [pkg, setPackage] = useState(null);

  useEffect(() => {
    setShowAddPackage(false);

    const fetchPackage = async () => {
      try {
        const response = await fetch(`http://localhost:5000/packages/${id}`);
        const data = await response.json();
        setPackage(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPackage();
  }, [setShowAddPackage, id]);

  if (!pkg)
    return (
      <p className="text-center py-10 text-gray-500 font-medium">
        Chargement...
      </p>
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="p-6 rounded-lg border-2 border-blue-200 bg-blue-100 shadow-sm">
        <h2 className="font-bold text-xl text-blue-900 mb-2">{pkg.name}</h2>
        <p className="text-gray-700 mb-2">{pkg.description}</p>
        <p className="font-semibold text-blue-800 mb-1">{pkg.price} €</p>
        <p className="text-sm text-gray-600 uppercase tracking-wide">
          {pkg.category}
        </p>
      </div>

      <Link
        to="/forfais"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition w-max"
      >
        Retour aux forfaits
      </Link>
    </div>
  );
};

export default Pkg;
