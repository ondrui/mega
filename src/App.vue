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
  created() {
    this.getData();
  },
  methods: {
    /**
     * Get data from Internal vs External APIs.
     */
    async getData() {
      try {
        const res = await Promise.all([
          fetch("/forecast.json"),
          fetch("/forecastFromAPI.json"),
        ]);
        const [a, b] = res.map((e) => e.json());
        const total = await a;
        const data = await b;
        setTimeout(() => {
          this.$store.commit("setData", total);
          this.$store.commit("setDataAPI", data);
        }, 1000);
      } catch (error) {
        this.answer = "Error! Could not reach the API. " + error;
      }
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  /** styling scrollbar component*/

  &::-webkit-scrollbar {
    width: 4px;
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    border: 4px solid #cfd6e4;
    background: #cfd6e4;
  }
}
// *::-webkit-scrollbar {
//   width: 4px;
// }
// *::-webkit-scrollbar-thumb {
//   border-radius: 10px;
//   background: #cfd6e4;
// }
a {
  text-decoration: none;
}
#app {
  background-color: #f5f5f5;
  scroll-behavior: smooth;
}
</style>
