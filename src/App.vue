<template>
  <div id="app">
    <MainInformer />
  </div>
</template>

<script>
import MainInformer from "@/components/MainInformer.vue";
export default {
  components: {
    MainInformer,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
.app {
  padding: 50px;
}
</style>
