<template>
  <div
    class="min-h-screen flex items-center justify-center bg-green-50 pb-4 pt-4"
  >
    <div
      class="border mt-2 p-6 rounded-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white shadow-lg"
    >
      <!-- Error Message -->
      <div
        v-if="message"
        class="bg-red-500 mb-4 text-white p-2 rounded-lg text-center"
      >
        {{ message }}
      </div>

      <h2 class="text-2xl font-semibold mb-6 text-green-900">
        Ajouter un Forfais
      </h2>

      <!-- Form -->
      <div v-if="!submitted">
        <form @submit.prevent="saveProduct">
          <div class="mb-4">
            <label
              for="forfaisName"
              class="block text-sm font-medium text-green-800"
              >Nom du Forfais</label
            >
            <input
              v-model="forfais.name"
              type="text"
              id="forfaisName"
              class="mt-1 p-3 border w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div class="mb-4">
            <label
              for="forfaisDescription"
              class="block text-sm font-medium text-green-800"
              >Description</label
            >
            <textarea
              v-model="forfais.description"
              id="forfaisDescription"
              class="mt-1 p-3 border w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            ></textarea>
          </div>

          <div class="mb-4">
            <label
              for="forfaisPrice"
              class="block text-sm font-medium text-green-800"
              >Prix (CAD)</label
            >
            <input
              v-model.number="forfais.price"
              type="number"
              id="forfaisPrice"
              class="mt-1 p-3 border w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div class="mb-4">
            <label
              for="forfaisImage"
              class="block text-sm font-medium text-green-800"
              >Image du Forfais</label
            >
            <input
              v-model="forfais.image"
              type="text"
              id="forfaisImage"
              class="mt-1 p-3 border w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
            />
          </div>

          <div class="mb-4">
            <label
              for="forfaisCategory"
              class="block text-sm font-medium text-green-800"
              >Catégorie</label
            >
            <select
              v-model="forfais.category"
              id="forfaisCategory"
              class="mt-1 p-3 border w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="Culture">Culture</option>
              <option value="Aventure">Aventure</option>
              <option value="Plage">Plage</option>
              <option value="Nature">Nature</option>
              <option value="Ville">Ville</option>
              <option value="Gastronomie">Gastronomie</option>
              <option value="Croisiere">Croisière</option>
            </select>
          </div>

          <div class="mb-6">
            <button
              type="submit"
              class="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition-colors duration-300"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>

      <!-- Success Message -->
      <div v-else>
        <div class="text-green-600 font-semibold mb-4 text-center">
          Forfais ajouté avec succès !
        </div>
        <button
          @click="newProduct"
          class="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition-colors duration-300"
        >
          Nouveau Forfais
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ForfaisDataService from "../services/ForfaisDataService";

export default {
  props: ["addInv"],
  data() {
    return {
      message: null,
      submitted: false,
      forfais: {
        name: "",
        description: "",
        price: "",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
        category: "",
      },
    };
  },
  methods: {
    saveProduct() {
      ForfaisDataService.create(this.forfais)
        .then((response) => {
          this.forfais.id = response.data.id;
          this.addInv(this.forfais);
          this.message = null;
          this.submitted = true;
        })
        .catch((e) => {
          this.message = e.response?.data?.message || "Erreur lors de l'ajout";
        });
    },
    newProduct() {
      this.submitted = false;
      this.forfais = {
        name: "",
        description: "",
        price: "",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
        category: "",
      };
    },
  },
};
</script>
