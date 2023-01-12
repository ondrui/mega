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
        :transform="windDirection(getLocales, value)"
      />
    </div>
    <div class="descr">
      <div class="title">
        {{ value.title }}
      </div>
      <div class="value">
        {{ value.value }}
        <span v-if="value.wind_dir">{{ value.wind_dir[1] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
import { windDirection } from "@/constants/functions";

export default {
  props: ["value"],
  computed: {
    getLocales() {
      return this.$store.getters.getLocales;
    },
  },
  methods: {
    languageExpressions,
    windDirection,
  },
};
</script>

<style lang="scss" scoped>
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

    & span {
      display: inline-block;
      text-transform: uppercase;
    }
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
