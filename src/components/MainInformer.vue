<template>
  <div class="main-container">
    <div>
      <b>{{
        setTimeFormat("2022-12-22T22:00:00+03:00", "l d F", "ru")
          .split(" ")
          .slice(0, 1)
          .join("")
      }}</b>
      {{
        setTimeFormat("2022-12-22T22:00:00+03:00", "l d F", "ru")
          .split(" ")
          .slice(1)
          .join(" ")
      }}
    </div>
    <HeaderInformer />
    <TabsInformer />
    <br />
  </div>
</template>

<script>
import HeaderInformer from "./Header/HeaderInformer.vue";
import TabsInformer from "./Tabs/TabsInformer.vue";
import { languageExpressions } from "@/constants/locales";
import { setTimeFormat } from "@/constants/functions";

export default {
  components: {
    HeaderInformer,
    TabsInformer,
  },
  computed: {
    getLocales() {
      return this.$store.getters.getLocales;
    },
  },
  methods: {
    languageExpressions,
    setTimeFormat,
  },
};
</script>

<style lang="scss">
.main-container {
  background-color: #ffffff;
  max-width: 900px;
  min-width: 400px;
}
</style>
