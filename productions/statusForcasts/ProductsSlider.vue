<template>
  <div>
    <div class="product-container">
      <Transition name="slide-fade">
        <template v-for="i in size">
          <div v-if="active == i" :key="i" class="product-card">
            <div class="product-image">
              <img
                src="@/assets/images/honey-jar.png"
                class="product-thumb"
                alt=""
              />
            </div>
            <div class="product-info">
              <span
                class="product-brand d-flex justify-content-space-between flex_gap--md"
              >
                <span> Product name </span>
                <span class="font-size--sm">Product code</span>
              </span>

              <p class="product-short-des mb-0">the remaining quantity</p>
              <span class="mt-0"> 26 items </span>
            </div>
          </div>
        </template>
      </Transition>
    </div>
    <!-- <BaseButton v-if="active < size && size != 1" class="nxt-btn" @click="move(1)">
            <img src="@/assets/images/icons/arrow-right.png" class="icon-sm m-auto">
          </BaseButton>
          <BaseButton v-if="active >1" class="pre-btn" @click="move(-1)">
            <img src="@/assets/images/icons/arrow-right.png" class="icon-sm m-auto">
          </BaseButton> -->
    <p class="d-flex justify-content-end mt-0 p-2 font-size--sm text-grey">
      {{ active }} / {{ size }}
    </p>
  </div>
</template>

<script>
export default {
  name: "ProductsSlider",
  data() {
    return {
      active: 1,
      size: 3,
    };
  },
  methods: {
    move(amount) {
      let newActive;
      const newIndex = Number(this.active + amount);
      if (newIndex > this.size) newActive = 1;
      if (newIndex < 1) newActive = this.size;
      this.active = newActive || newIndex;
      if (newActive === 0 && newIndex > 0) {
        this.active = newActive;
      }
    },
  },
};
</script>

<style>
</style>