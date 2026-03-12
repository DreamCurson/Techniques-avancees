<template>
  <div class="flex flex-col min-h-screen">
    <nav class="bg-green-50 border-green-200 shadow-md">
      <div class="flex flex-wrap items-center justify-between mx-auto p-4">
        <div class="flex items-center space-x-3 rtl:space-x-reverse">
          <router-link to="/">
            <span
              class="self-center text-2xl font-bold text-green-900 whitespace-nowrap"
            >
              Voyage
            </span>
          </router-link>
        </div>
        <div
          class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
        >
          <button type="button" class="mr-2" @click="toggleSideBar">
            <svg
              class="w-6 h-6 text-green-800 hover:text-green-900 transition-colors duration-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 21C12 21 5 16 3.5 11C2.5 7.5 5 5 8 5C10 5 11.5 6.5 12 7.5C12.5 6.5 14 5 16 5C19 5 21.5 7.5 20.5 11C19 16 12 21 12 21Z"
              />
            </svg>
          </button>
          <span
            class="bg-green-700 rounded-full text-white h-7 w-7 flex items-center justify-center font-semibold"
          >
            {{ totalQuantity }}
          </span>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-green-200 rounded-lg bg-green-100 md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-green-50"
          >
            <li>
              <router-link
                to="/index"
                class="block py-2 px-3 text-white bg-green-600 rounded md:bg-transparent md:text-green-800 md:p-0 hover:text-green-900 transition-colors duration-300"
                aria-current="page"
              >
                Accueil
              </router-link>
            </li>
            <li>
              <router-link
                to="/forfais/add"
                class="block py-2 px-3 text-white bg-green-600 rounded md:bg-transparent md:text-green-800 md:p-0 hover:text-green-900 transition-colors duration-300"
              >
                Ajouter un forfais
              </router-link>
            </li>
            <li>
              <router-link
                to="/about"
                class="block py-2 px-3 text-white bg-green-600 rounded md:bg-transparent md:text-green-800 md:p-0 hover:text-green-900 transition-colors duration-300"
              >
                À propos de l'agence
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view
      :inventory="inventory"
      :add="addToWish"
      :wishlist="wishlist"
      :addInv="addInventory"
      :updateInv="updateForfais"
      :removeInv="removeInventory"
      :remItem="removeItem"
    />
    <MainFooter class="mt-auto" />
    <SideBar
      v-if="showSideBar"
      :toggle="toggleSideBar"
      :cart="wishlist"
      :inventory="inventory"
      :remove="removeItem"
    />
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";
import MainFooter from "./components/MainFooter.vue";
import ForfaisDataService from "./services/ForfaisDataService";

export default {
  components: {
    SideBar,
    MainFooter,
  },
  mounted() {
    ForfaisDataService.getAll()
      .then((response) => {
        this.inventory = response.data;
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  },
  data() {
    return {
      showSideBar: false,
      inventory: [],
      wishlist: {},
    };
  },
  methods: {
    toggleSideBar() {
      this.showSideBar = !this.showSideBar;
    },
    addToWish(forfais) {
      if (this.wishlist[forfais]) {
        delete this.wishlist[forfais];
      } else {
        this.wishlist[forfais] = 1;
      }
    },
    removeItem(name) {
      delete this.wishlist[name];
    },
    addInventory(forfais) {
      this.inventory.push(forfais);
    },
    updateForfais(index, data) {
      this.inventory[index].name = data.name;
      this.inventory[index].image = data.image;
      this.inventory[index].price = data.price;
      this.inventory[index].description = data.description;
      this.inventory[index].category = data.category;
    },
    removeInventory(index) {
      this.inventory.splice(index, 1);
    },
  },
  computed: {
    totalQuantity() {
      return Object.keys(this.wishlist).length;
    },
  },
};
</script>
