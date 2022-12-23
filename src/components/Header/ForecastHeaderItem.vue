<template>
  <div class="climate-index">
    <div class="block-icon">
      <BaseIcon
        name="rect-background"
        pick="common"
        class="background"
        width="40"
      />
      <BaseIcon
        :name="value.icon"
        pick="common"
        class="icon"
        width="14"
        :transform="windDirection"
      />
    </div>
    <div class="descr">
      <div class="title">
        {{ value.title }}
      </div>
      <div class="value">
        {{ value.value }}
      </div>
    </div>
  </div>
</template>

<script>
import { languageExpressions } from "@/constants/locales";

export default {
  props: ["value"],
  computed: {
    getLocales() {
      return this.$store.getters.getLocales;
    },
    windDirection() {
      return this.value.icon.includes("wind") && this.value.direction
        ? `rotate(${
            languageExpressions(
              this.getLocales,
              "windDir",
              this.value?.direction
            )[0]
          })`
        : "rotate(0)";
    },
  },
  methods: {
    languageExpressions,
  },
};
</script>

<style lang="scss">
.climate-index {
  display: flex;
}
.descr {
  display: flex;
  flex-direction: column;
  padding-left: 6px;
  justify-content: center;
  row-gap: 2px;
  white-space: nowrap;

  & .title {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #9c9c9c;

    &::first-letter {
      text-transform: capitalize;
    }
  }

  & .value {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #000000;
  }
}
.block-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .icon {
    position: absolute;
  }
}
</style>
