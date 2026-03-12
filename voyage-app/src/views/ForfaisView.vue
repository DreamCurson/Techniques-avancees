<template>
  <div class="border-t border-green-200 bg-green-50">
    <section class="py-5">
      <div class="container px-4 px-lg-5 my-5">
        <div class="flex flex-col lg:flex-row items-center lg:items-start">
          <div class="lg:w-1/2 mb-5 lg:mb-0 p-6">
            <img
              class="w-full rounded-lg shadow-lg mb-5 lg:mb-0"
              :src="forfais.image"
              :alt="forfais.name"
            />
          </div>
          <div class="lg:w-1/2 p-6">
            <h1 class="text-3xl lg:text-5xl font-bold mb-3 text-green-900">
              {{ forfais.name }}
            </h1>
            <div class="text-xl mb-5 font-semibold text-green-800">
              $ {{ forfais.price.toFixed(2) }}
            </div>
            <p class="text-lg leading-relaxed mb-5 text-green-900">
              {{ forfais.description }}
            </p>
            <div class="flex items-center space-x-3 rtl:space-x-reverse">
              <button
                @click="add(forfais.name)"
                class="text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-300"
                :class="
                  wishlist[forfais.name]
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-green-500 hover:bg-green-600'
                "
              >
                {{
                  wishlist[forfais.name]
                    ? "Déjà en favoris (retirer)"
                    : "Ajouter à la liste de souhait"
                }}
              </button>
              <router-link
                :to="{ name: 'edit-forfais', params: { id: forfais.id } }"
                class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300"
              >
                Modifier
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  props: ["inventory", "add", "wishlist"],
  computed: {
    forfais() {
      const forfais = this.inventory.find((p) => {
        return p.id === Number(this.$route.params.id);
      });
      // console.log(forfais);
      return forfais;
    },
    productIndex() {
      const index = this.inventory.findIndex((p) => {
        return p.id === Number(this.$route.params.id);
      });
      return index;
    },
  },
};
</script>
