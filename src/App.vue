<template>
  <div id="app">
    <MainInformer />
    <AllSVGIcons />
  </div>
</template>

<script>
import MainInformer from "@/components/MainInformer.vue";
import AllSVGIcons from "./components/AllSVGIcons.vue";
export default {
  components: {
    MainInformer,
    AllSVGIcons,
  },
};
</script>

<style lang="scss">
body {
  height: 100vh;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
#app {
  padding: 20px;
  background-color: #f5f5f5;
  height: 100vh;
}
</style>
