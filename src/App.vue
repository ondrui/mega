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
     * Get data from API.
     */
    async getData() {
      try {
        const res = await Promise.all([
          fetch("/forecastHourly72.json"),
          fetch("/forecastTenDays.json"),
        ]);
        const [a, b] = res.map((e) => e.json());
        const hourly = await a;
        const tenDays = await b;
        setTimeout(() => {
          this.$store.commit("setHourly", hourly);
          this.$store.commit("setTenDays", tenDays);
        }, 1000);
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
  height: 100vh;
}
</style>
