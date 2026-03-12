<template>
  <div
    class="min-h-screen flex items-center justify-center bg-green-50 pb-4 pt-4"
  >
    <div
      class="border mt-2 p-6 rounded-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white shadow-lg"
    >
      <!-- Error Message -->
      <div
        v-show="message"
        class="bg-red-500 mb-4 text-white p-2 rounded-lg text-center"
      >
        {{ message }}
      </div>

      <h2 class="text-2xl font-semibold mb-6 text-green-900 text-center">
        Modifier le forfais
      </h2>

      <!-- Form -->
      <div v-if="!submitted">
        <form ref="form" @submit.prevent="updateForfais">
          <div class="mb-4">
            <label
              for="forfaisName"
              class="block text-sm font-medium text-green-800"
            >
              Nom du forfais
            </label>
            <input
              type="text"
              id="forfaisName"
              class="mt-1 p-3 border w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              v-model="forfais.name"
              required
            />
          </div>

          <div class="mb-4">
            <label
              for="forfaisDescription"
              class="block text-sm font-medium text-green-800"
            >
              Description
            </label>
            <textarea
              id="forfaisDescription"
              class="mt-1 p-3 border w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              v-model="forfais.description"
              required
            ></textarea>
          </div>

          <div class="mb-4">
            <label
              for="forfaisPrice"
              class="block text-sm font-medium text-green-800"
            >
              Prix (CAD)
            </label>
            <input
              type="number"
              id="forfaisPrice"
              class="mt-1 p-3 border w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              v-model.number="forfais.price"
              required
            />
          </div>

          <div class="mb-4">
            <label
              for="forfaisImage"
              class="block text-sm font-medium text-green-800"
            >
              Image du forfais
            </label>
            <input
              type="text"
              id="forfaisImage"
              class="mt-1 p-3 border w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              v-model="forfais.image"
            />
          </div>

          <div class="mb-4">
            <label
              for="forfaisCategory"
              class="block text-sm font-medium text-green-800"
            >
              Catégorie
            </label>
            <select
              id="forfaisCategory"
              class="mt-1 p-3 border w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              v-model="forfais.category"
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
              Modifier
            </button>
            <button
              type="button"
              @click="deleteForfais"
              class="w-full mt-4 bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition-colors duration-300"
            >
              Supprimer
            </button>
          </div>
        </form>
      </div>

      <!-- Success Message -->
      <div v-else>
        <div class="text-green-600 font-semibold mb-4 text-center">
          Forfais mis à jour avec succès !
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ForfaisDataService from "../services/ForfaisDataService";

export default {
  props: ["inventory", "updateInv", "removeInv", "remItem"],
  data() {
    return {
      message: null,
      submitted: false,
      forfais: {},
      id: parseInt(this.$route.params.id),
    };
  },
  methods: {
    updateForfais() {
      ForfaisDataService.update(this.id, this.forfais)
        .then((response) => {
          this.updateInv(this.ForfaisIndex, this.forfais);
          this.submitted = true;
          this.message = null;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    deleteForfais() {
      ForfaisDataService.delete(this.id)
        .then((response) => {
          this.removeInv(this.ForfaisIndex);
          this.remItem(this.forfais.name);
          this.$router.push({ name: "home" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  computed: {
    ForfaisIndex() {
      const index = this.inventory.findIndex((p) => {
        return p.id === this.id;
      });
      return index;
    },
  },
  mounted() {
    ForfaisDataService.get(this.id).then((response) => {
      this.forfais = response.data;
    });
  },
};
</script>
