<template>
  <div class="header-container">
    <BreadcrumbsHeader />
    <SearchHeader />
    <ForecastHeader />
  </div>
</template>

<script>
import BreadcrumbsHeader from "./BreadcrumbsHeader.vue";
import SearchHeader from "./SearchHeader.vue";
import ForecastHeader from "./ForecastHeader.vue";

export default {
  components: {
    BreadcrumbsHeader,
    SearchHeader,
    ForecastHeader,
  },
};
</script>

<style lang="scss">
.header-container {
  padding: 20px;
  border: 1px solid teal;
}
</style>
