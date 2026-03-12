<template>
  <aside class="fixed top-0 right-0 h-full rounded-lg shadow-xl z-50">
    <div class="h-full relative bg-green-50 text-green-900 overflow-auto">
      <h1
        class="flex justify-between items-center p-4 bg-green-300 border-b border-green-400 text-lg font-bold"
      >
        <svg
          class="w-6 h-6 text-green-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 21C12 21 5 16 3.5 11C2.5 7.5 5 5 8 5C10 5 11.5 6.5 12 7.5C12.5 6.5 14 5 16 5C19 5 21.5 7.5 20.5 11C19 16 12 21 12 21Z"
          />
        </svg>
        <button
          class="text-green-900 text-2xl font-bold hover:text-green-700 transition-colors duration-300"
          @click="toggle"
        >
          &times;
        </button>
      </h1>
      <div class="max-h-full p-4">
        <table class="w-full border-collapse text-sm">
          <thead>
            <tr class="text-xs bg-green-100">
              <th class="p-2 text-left">Image du forfais</th>
              <th class="p-2 text-left">Forfais</th>
              <th class="p-2 text-left">Prix</th>
              <th class="p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(quantity, key, i) in cart"
              :key="i"
              class="my-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
            >
              <td class="p-2">
                <img
                  :src="getPhoto(key)"
                  :alt="key"
                  class="w-24 h-24 object-cover rounded-lg"
                />
              </td>
              <td class="max-w-[150px] truncate p-2">{{ key }}</td>
              <td class="p-2">${{ getPrice(key) }}</td>
              <td class="text-center p-2">
                <button
                  class="text-red-600 px-4 py-1 text-lg font-bold hover:text-red-400 transition-colors duration-300"
                  @click="remove(key)"
                >
                  &times;
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p
          v-if="!Object.keys(cart).length"
          class="text-center mt-4 italic text-green-700"
        >
          Aucun forfais dans la liste de souhait
        </p>
        <div class="flex justify-between mt-4 font-semibold text-green-800">
          <span class="mb-4"
            >Total de forfais en liste de souhait: {{ calculateTotal() }}</span
          >
        </div>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  props: ["toggle", "cart", "inventory", "remove"],
  methods: {
    getPrice(name) {
      const forfais = this.inventory.find((p) => {
        return p.name === name;
      });
      return forfais.price.toFixed(2);
    },
    getPhoto(name) {
      const forfais = this.inventory.find((p) => {
        return p.name === name;
      });
      return forfais.image;
    },
    calculateTotal() {
      return Object.keys(this.cart).length;
    },
  },
};
</script>
