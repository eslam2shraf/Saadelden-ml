<template>
  <li
    class="list-item d-block nuxt-link-active"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="d-flex pointer align-items-center mb-2" @click="toggleShow">
      <component :is="icon" :key="icon" class="title_icon" aria-hidden="true" />
      <span
        class="d-flex justify-content-space-between w-76 align-items-center"
      >
    
        <span>
          {{ title }}
        </span>
        <component
          :is="arrowicon"
          :key="arrowicon"
          class="arrow_icon"
          aria-hidden="true"
          :class="{ 'rotate-90': showMenu }"
        />
      </span>
    </div>
    <ul class="sub-menu overflow-hidden dropdown-menu" :class="this.class">
      <slot></slot>
    </ul>
  </li>
</template>

<script>
import ProductsIcon from "../icon/ProductsIcon.vue";
import ProductionsIcon from "../icon/ProductionsIcon.vue";
import CustomersIcon from "../icon/CustomersIcon.vue";
import CheveronRight from "../icon/CheveronRight.vue";
import Global from "../icon/Global.vue";
import CheveronLeft from "../icon/CheveronLeft.vue";
import Receipt from '../icon/Receipt.vue';
export default {
  name: "DropDownMenu",
  components: {
    ProductsIcon,
    CustomersIcon,
    ProductionsIcon,
    CheveronRight,
    Global,
    CheveronLeft,
    Receipt,
  },
  props: {
    title: {
      type: String,
    },
    display: {
      type: String,
    },
    icon: {
      type: String,
    },
    arrowicon: {
      type: String,
    },
  },
  data() {
    return {
      showMenu: false,
    };
  },

  methods: {
    toggleShow() {
      this.showMenu = !this.showMenu;
    },
  },

  computed: {
    class() {
      return this.showMenu ? this.display : "d-none";
    },
  },
};
</script>

<style>
.dropdown-menu {
  transition: 200ms;
}
svg.rotate-90 {
  transform: rotate(-90deg);
}
</style>