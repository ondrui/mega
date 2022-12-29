<template>
  <div class="main-container">
    <div v-if="!loading">Loading...</div>
    <div v-else>
      <HeaderInformer />
      <TabsInformer />
      <br />
      <AllSVGIcons />
    </div>
  </div>
</template>

<script>
import HeaderInformer from "./Header/HeaderInformer.vue";
import TabsInformer from "./Tabs/TabsInformer.vue";
import AllSVGIcons from "./AllSVGIcons.vue";
import { languageExpressions } from "@/constants/locales";
import { setTimeFormat } from "@/constants/functions";

export default {
  components: {
    HeaderInformer,
    TabsInformer,
    AllSVGIcons,
  },
  computed: {
    getLocales() {
      return this.$store.getters.getLocales;
    },
    loading() {
      return this.$store.getters.loading;
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
