<template>
  <div class="breadcrumbs-header">
    <div class="crumbs">
      <div v-for="(item, index) in crumbs" :key="item">
        <a v-if="isLast(index)" href="#">{{ item }}</a>
        <span v-else>{{ item }}</span>
        <BaseIcon
          name="chevron-breadcrumb-right"
          width="5"
          pick="common"
          v-if="isLast(index)"
          class="breadcrumbs-chevron"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
export default {
  data() {
    return {
      crumbs: [],
    };
  },
  mounted() {
    this.breadcrumbs("breadcrumbs", ["main", "weather", "city"]);
  },
  computed: {
    getLocales() {
      return this.$store.getters.getLocales;
    },
  },
  methods: {
    languageExpressions,
    isLast(index) {
      return index !== this.crumbs.length - 1;
    },
    breadcrumbs(key, arr) {
      arr.forEach((element) => {
        this.crumbs.push(languageExpressions(this.getLocales, key, element));
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumbs-header {
  display: flex;
  align-items: center;
  margin-bottom: 22px;
}

.crumbs {
  display: flex;
  align-items: center;
  max-width: 950px;
  min-width: max-content;
  width: 100%;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  & div::first-letter {
    text-transform: capitalize;
  }

  & a {
    color: #04569c;
  }

  & span {
    color: #9c9c9c;
  }

  & .breadcrumbs-chevron,
  & a {
    margin-right: 8px;
  }
}

@media only screen and (max-width: 600px) {
  .breadcrumbs-header {
    margin-bottom: 16px;
  }
}
</style>
