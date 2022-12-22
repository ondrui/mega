<template>
  <div id="app" class="p-20">
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
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const res = await fetch("/forecastHourly72.json");
        const answer = await res.json();
        setTimeout(() => {
          this.$store.commit("setHourly", answer);
        }, 5000);
      } catch (error) {
        this.answer = "Error! Could not reach the API. " + error;
      }
    },
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
  background-color: #f5f5f5;
  height: 100vh;
}
</style>
