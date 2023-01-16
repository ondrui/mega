<template>
  <div class="segment-container">
    <h1 class="segment-title">
      {{ languageExpressions(getLocales, "detailsSegmentTitle") }}
    </h1>
    <div
      class="wrapper-list"
      v-for="(item, index) in tenDaysDetailsCard"
      :key="`s-${index}`"
    >
      <CardDetailDay :value="item" />
      <ContentDetailDay
        :class="{ hidden: isHidden }"
        :data="tenDaysDetailsChart[`${index + 1}`]"
      />
    </div>
  </div>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
import CardDetailDay from "./CardDetailDay.vue";
import ContentDetailDay from "./ContentDetailDay.vue";

export default {
  components: {
    CardDetailDay,
    ContentDetailDay,
  },
  computed: {
    getLocales() {
      return this.$store.getters.getLocales;
    },
    tenDaysDetailsCard() {
      return this.$store.getters.tenDaysDetailsCard;
    },
    tenDaysDetailsChart() {
      return this.$store.getters.tenDaysDetailsChart;
    },
    isHidden() {
      return false;
    },
  },
  methods: {
    languageExpressions,
  },
};
</script>

<style lang="scss" scoped>
.segment-container {
  padding: 30px 32px 42px 32px;
}
.segment-title {
  padding-left: 26px;
  font-weight: 300;
  font-size: 20px;
  line-height: 23px;
  color: #333333;

  &::first-letter {
    text-transform: capitalize;
  }
}
.hidden {
  display: none;
}

@media only screen and (max-width: 450px) {
  .segment-container {
    padding: 30px 4px 23px 4px;
  }
}
</style>
