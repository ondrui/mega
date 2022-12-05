<template>
  <div class="forecast-container">
    <div class="forecast-date-info">
      {{
        `${expressions(getLocales, "header", "now")} 15:38 ${expressions(
          getLocales,
          "header",
          "forecast"
        )}`
      }}
    </div>
    <div class="forecast-content">
      <div class="forecast-content-left">
        <div class="weather-icon"></div>
        <div class="temp"></div>
        <div class="descr-block"></div>
      </div>
      <div class="forecast-content-right">
        <ForecastHeaderItem
          v-for="(key, index) in climateindicatorKeys"
          :key="`cn-${index}`"
          :indicatorKey="key"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { expressions } from "@/constants/locales";
import ForecastHeaderItem from "./ForecastHeaderItem.vue";

export default {
  components: {
    ForecastHeaderItem,
  },
  data() {
    return {
      climateindicatorKeys: ["pressure", "wind", "windGust_1", "humidity"],
    };
  },
  computed: {
    getLocales() {
      return this.$store.getters.getLocales;
    },
  },
  methods: {
    expressions,
  },
};
</script>

<style lang="scss">
.forecast-date-info {
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #9c9c9c;
  margin-top: 16px;
}
.forecast-content {
  display: flex;
}
.forecast-content-left {
  display: flex;
}
.forecast-content-right {
  display: flex;
}
.climate-index {
  display: flex;
}
.icon {
  display: flex;
}
.descr {
  display: flex;
}
.title::first-letter {
  text-transform: capitalize;
}
</style>
