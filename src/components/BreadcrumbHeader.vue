<template>
  <div class="breadcrumbs">
    <div class="crumbs">
      <a href="#">{{ title("breadcrumbs", "main") }}</a>
    </div>
  </div>
</template>

<script>
import { expressions } from "@/constants/locales";
export default {
  computed: {
    getLocales() {
      return this.$store.getters.getLocales;
    },
  },
  methods: {
    title(key, name) {
      const e = expressions(this.getLocales, key, name);
      return e ?? "";
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  overflow-x: auto;
  padding: 18px;
  border: 1px solid teal;

  & .breadcrumbs .crumbs {
    display: flex;
    align-items: center;
    max-width: 950px;
    min-width: max-content;
    width: 100%;
  }
}
</style>
