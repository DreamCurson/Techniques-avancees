import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ toggleForm, showAdd, title = "Forfais Voyage" }) => {
  const location = useLocation();

  const showTitle = location.pathname !== "/" && location.pathname !== "/about";

  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 md:gap-0">
      {showTitle && (
        <h1 className="text-3xl font-bold text-blue-900">{title}</h1>
      )}

      {location.pathname === "/forfais" && (
        <Button
          text={showAdd ? `Fermer` : `Ajouter un forfait`}
          onClick={toggleForm}
          color={showAdd ? `btn-red` : `btn-green`}
        />
      )}
    </header>
  );
};

export default Header;
