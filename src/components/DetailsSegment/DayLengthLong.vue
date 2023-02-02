<template>
  <div class="day-length-block">
    <div v-show="isShowSunrise" class="time">{{ value.dayLength.sunrise }}</div>
    <div v-show="isShowSunrise" class="icon">
      <BaseIcon name="sunrise-1" pick="common" width="20" />
    </div>
    <div v-show="isShowLine" class="line"></div>
    <div v-show="isShowDayLength" class="day-length">
      {{
        value.dayLength.daytime.value ??
        languageExpressions(getLocales, "polar", value.dayLength?.polar)
      }}
    </div>
    <div v-show="isShowLine" class="line"></div>
    <div v-show="isShowSunset" class="icon">
      <BaseIcon name="sunset-1" pick="common" width="20" />
    </div>
    <div v-show="isShowSunset" class="time">{{ value.dayLength.sunset }}</div>
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
    isShowSunrise() {
      return !!this.value.dayLength.sunrise;
    },
    isShowDayLength() {
      return !!(
        this.value.dayLength.daytime.value || this.value.dayLength.polar
      );
    },
    isShowSunset() {
      return !!this.value.dayLength.sunset;
    },
    isShowLine() {
      return this.value.dayLength.polar !== "night";
    },
  },
  methods: {
    languageExpressions,
  },
};
</script>
<style lang="scss" scoped>
svg {
  display: block;
}
.day-length-block {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2px;
  min-height: 22px;
}
.time {
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;

  color: #4d4d4d;
}
.line {
  flex-grow: 1;
  width: 1px;
  border-bottom: 1px dashed #8797a5;
}
.icon {
  display: flex;
  align-items: center;
  padding: 0 4px;
}
.day-length {
  padding: 0 4px;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: #4d4d4d;
}

@media only screen and (max-width: 600px) {
}
</style>
