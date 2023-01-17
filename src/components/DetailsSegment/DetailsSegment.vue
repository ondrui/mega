<template>
  <div class="segment-container">
    <h1 class="segment-title">
      {{ languageExpressions(getLocales, "detailsSegmentTitle") }}
    </h1>
    <div
      ref="item"
      class="wrapper-list"
      v-for="(item, index) in tenDaysDetailsCard"
      :key="`s-${index}`"
      tabindex="0"
    >
      <CardDetailDay :value="item" :index="index" />
      <ContentDetailDay
        :class="{ hidden: !item.isOpen }"
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
  watch: {
    tenDaysDetailsCard() {
      this.focus();
    },
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
  },
  methods: {
    languageExpressions,
    focus() {
      const index = this.tenDaysDetailsCard.findIndex((i) => i.isOpen === true);
      // if (index !== -1) this.$refs.item[index].focus();
      if (index !== -1)
        this.$refs.item[index].scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
    },
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
