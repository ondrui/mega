<template>
  <div class="main-container">
    <div v-if="!loading">Loading...</div>
    <div v-else>
      <HeaderInformer />
      <TabsInformer />
      <DetailsSegment />
      <!-- <br /> -->
      <AllSVGIcons class="hidden" />
    </div>
  </div>
</template>

<script>
import HeaderInformer from "./Header/HeaderInformer.vue";
import TabsInformer from "./Tabs/TabsInformer.vue";
import DetailsSegment from "./DetailsSegment/DetailsSegment.vue";
import AllSVGIcons from "./AllSVGIcons.vue";
import { languageExpressions } from "@/constants/locales";
import { setTimeFormat } from "@/constants/functions";

export default {
  components: {
    HeaderInformer,
    TabsInformer,
    AllSVGIcons,
    DetailsSegment,
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
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 900px;
  min-width: 400px;
}
.hidden {
  display: none;
}
</style>
