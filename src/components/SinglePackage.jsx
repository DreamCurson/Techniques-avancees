import { FaTimes, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const SinglePackage = ({ pkg, onDelete }) => {
  return (
    <div className="p-6 mb-4 rounded-lg border-2 border-blue-200 bg-blue-100 shadow-sm">
      <h3 className="font-bold text-xl text-blue-900 mb-2">{pkg.name}</h3>
      <p className="text-gray-700 mb-2">{pkg.description}</p>
      <p className="font-semibold text-blue-800 mb-1">{pkg.price} €</p>
      <p className="text-sm text-gray-600 uppercase tracking-wide">
        {pkg.category}
      </p>

      <div className="flex gap-4 mt-3">
        <button
          className="flex items-center gap-1 text-red-600 hover:text-red-800"
          onClick={() => onDelete(pkg.id)}
        >
          <FaTimes />
        </button>

        <Link
          to={`/forfais/${pkg.id}`}
          className="flex items-center gap-1 text-blue-900 hover:underline"
        >
          <FaEye />
        </Link>
      </div>
    </div>
  );
};

export default SinglePackage;
