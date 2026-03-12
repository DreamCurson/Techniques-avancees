<template>
  <div class="bg-green-50 min-h-screen">
    <HeroHeader />
    <div
      class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-6 px-4"
    >
      <div
        v-for="(forfais, i) in inventory"
        :key="i"
        class="w-full max-w-sm bg-white border border-green-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        <img
          class="p-6 rounded-t-xl w-full h-48 object-cover brightness-95 hover:brightness-105 transition-all duration-300"
          :src="forfais.image"
          :alt="forfais.name"
        />
        <div class="px-6 pb-6 text-center">
          <h5 class="text-2xl font-bold text-green-900 mb-2 tracking-wide">
            {{ forfais.name }}
          </h5>
          <div class="mb-3">
            <router-link
              :to="{ name: 'forfais', params: { id: forfais.id } }"
              class="text-green-700 hover:text-green-900 font-medium hover:underline"
            >
              Voir plus...
            </router-link>
          </div>
          <span class="text-3xl font-extrabold text-green-800">
            {{ forfais.price.toFixed(2) }}
          </span>
          <div class="flex items-center justify-center mt-4">
            <button
              @click="add(forfais.name)"
              class="text-white font-semibold rounded-full text-sm px-6 py-3 transition-colors duration-300"
              :class="
                wishlist[forfais.name]
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-green-400 hover:bg-green-500'
              "
            >
              {{
                wishlist[forfais.name]
                  ? "Déjà en favoris (retirer)"
                  : "Ajouter à la liste de souhait"
              }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeroHeader from "../components/HeroHeader.vue";

export default {
  components: {
    HeroHeader,
  },
  props: ["inventory", "add", "wishlist"],
};
</script>
