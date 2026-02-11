import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="w-full bg-sky-500 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-center">
        <div className="flex gap-10">
          <Link
            to="/"
            className="text-white font-medium hover:text-sky-200 transition"
          >
            Accueil
          </Link>

          <Link
            to="/forfais"
            className="text-white font-medium hover:text-sky-200 transition"
          >
            Forfaits
          </Link>

          <Link
            to="/about"
            className="text-white font-medium hover:text-sky-200 transition"
          >
            À propos
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
