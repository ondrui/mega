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
        <div class="weather-icon">
          <BaseIcon :name="nowcast.icon" pick="light" width="49" />
        </div>
        <div class="temp">{{ nowcast.temp }}</div>
        <div class="descr-block">
          <div class="text-descr">{{ nowcast.descr }}</div>
          <div class="feeling">
            {{
              `${expressions(getLocales, "header", "feelsLike")} ${
                nowcast.realFeel
              }`
            }}
          </div>
        </div>
      </div>
      <div class="forecast-content-right">
        <ForecastHeaderItem
          v-for="(value, index) in forecastForItemHeader"
          :key="`cn-${index}`"
          :value="value"
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
    forecastForItemHeader() {
      return this.$store.getters.forecastForItemHeader;
    },
    nowcast() {
      return this.$store.getters.nowcast;
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
  margin-bottom: 16px;
}
.forecast-content {
  display: flex;
}
.forecast-content-left {
  display: flex;

  & .temp {
    font-weight: 400;
    font-size: 48px;
    line-height: 56px;
    color: #333333;
  }

  & .descr-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 130px;

    & .text-descr {
      font-weight: 400;
      font-size: 11px;
      line-height: 13px;
      color: #9c9c9c;
    }

    & .text-descr::first-letter {
      text-transform: capitalize;
    }

    & .feeling {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #000000;
    }

    & .feeling::first-letter {
      text-transform: capitalize;
    }
  }
}
.forecast-content-right {
  display: flex;
  justify-content: space-around;
  min-width: 470px;
}
.climate-index {
  display: flex;
}
</style>
