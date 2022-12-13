<template>
  <div class="main-container">
    <HeaderInformer />
    <TabsInformer />
    <br />
  </div>
</template>

<script>
import HeaderInformer from "./Header/HeaderInformer.vue";
import TabsInformer from "./Tabs/TabsInformer.vue";
import { languageExpressions } from "@/constants/locales";

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
