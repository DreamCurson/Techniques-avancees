import SinglePackage from "./SinglePackage";

const ManyPackage = ({ packages, onDelete, onToggle }) => {
  return (
    <>
      {packages.length > 0 ? (
        packages.map((pkg) => (
          <SinglePackage key={pkg.id} pkg={pkg} onDelete={onDelete} />
        ))
      ) : (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 font-bold">
          Empty List
        </div>
      )}
    </>
  );
};

export default ManyPackage;
