<template>
  <div class="breadcrumbs">
    <div class="crumbs">
      <div v-for="(item, index) in crumbs" :key="item">
        <a v-if="isLast(index)" href="#">{{ item }}</a>
        <span v-else>{{ item }}</span>
        <ChevronCrumbRight v-if="isLast(index)" class="breadcrumbs-chevron" />
      </div>
    </div>
  </div>
</template>

<script>
import { expressions } from "@/constants/locales";
import ChevronCrumbRight from "@/assets/images/common-icons/icon-chevron-breadcrumb-right.svg";
export default {
  components: {
    ChevronCrumbRight,
  },
  data() {
    return {
      crumbs: [],
    };
  },
  mounted() {
    this.crumbs.push(expressions(this.getLocales, "breadcrumbs", "main"));
    this.crumbs.push(expressions(this.getLocales, "breadcrumbs", "weather"));
    this.crumbs.push(expressions(this.getLocales, "breadcrumbs", "city"));
  },
  computed: {
    getLocales() {
      return this.$store.getters.getLocales;
    },
  },
  methods: {
    expressions,
    isLast(index) {
      return index !== this.crumbs.length - 1;
    },
  },
};
</script>

<style lang="scss">
.breadcrumbs {
  display: flex;
  align-items: center;
  overflow-x: auto;
  padding: 18px;
  border: 1px solid teal;

  & .crumbs {
    display: flex;
    align-items: center;
    max-width: 950px;
    min-width: max-content;
    width: 100%;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
  }

  & a {
    color: #04569c;

    &::first-letter {
      text-transform: capitalize;
    }
  }

  & span {
    color: #9c9c9c;
  }

  & .breadcrumbs-chevron,
  & a {
    margin-right: 8px;
  }
}
</style>
