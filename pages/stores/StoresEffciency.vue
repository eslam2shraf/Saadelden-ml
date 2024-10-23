<template>
    <div>
      <LayoutsNavbar />
     <StoresEffciency/>
      <LayoutsFooter />
    </div>
  </template>
  
  <script>
  export default {
    name: "MLStoresEffciency",
    middleware: "authenticated",
    data() {
      return {};
    },
  
    mounted() {},
  
    methods: {},
  };
  </script>
  
  <style lang="scss" scoped></style>
  