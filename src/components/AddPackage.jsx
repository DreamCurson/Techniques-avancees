import { useState } from "react";

const AddPackage = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !price || !category) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    onAdd({ name, description, price: parseFloat(price), category });

    // Clear form
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
  };

  return (
    <form className="p-2 rounded-lg mx-auto mb-6" onSubmit={onSubmit}>
      <h2 className="text-xl font-bold text-blue-900 mb-4">
        Ajouter un forfait voyage
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Nom du package
        </label>
        <input
          type="text"
          placeholder="Nom du package"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Description
        </label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-blue-200 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          rows={4}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Prix ($)
        </label>
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Catégorie
        </label>
        <input
          type="text"
          placeholder="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition-colors block"
      >
        Ajouter le forfait voyage
      </button>
    </form>
  );
};

export default AddPackage;
