<template>
  <div class="forecast-container">
    <div class="forecast-date-info">
      {{
        `${languageExpressions(
          getLocales,
          "header",
          "now"
        )} 15:38 ${languageExpressions(getLocales, "header", "forecast")}`
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
              `${languageExpressions(getLocales, "header", "feelsLike")} ${
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
import { languageExpressions } from "@/constants/locales";
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
    languageExpressions,
  },
};
</script>

<style lang="scss">
.forecast-date-info {
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #9c9c9c;
  margin-bottom: 16px;
}
.forecast-content {
  display: flex;
  column-gap: 14px;
  row-gap: 22px;
  flex-wrap: wrap;
}
.forecast-content-left {
  display: flex;
  align-items: center;

  & .temp {
    font-weight: 400;
    font-size: 48px;
    line-height: 56px;
    color: #333333;
    padding-left: 8px;
  }

  & .descr-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    row-gap: 2px;
    width: 180px;
    padding-left: 15px;

    & .text-descr {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
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
  flex: 1;
  column-gap: 8px;
  justify-content: space-between;
  align-items: center;
}

@media only screen and (max-width: 870px) {
  .forecast-content-right {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 8px 17px;
  }
}
</style>
