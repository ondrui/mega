<template>
  <div class="forecast-details-container">
    <!-- <div class="details-row-caption prec-sum">
      {{ languageExpressions(getLocales, "climateIndicators", "precSum") }}
    </div> -->
    <div class="details-row-caption wind">
      {{ languageExpressions(getLocales, "climateIndicators", "windDirSpeed") }}
    </div>
    <div class="details-row-caption pressure">
      {{ languageExpressions(getLocales, "climateIndicators", "pressure") }},
      {{ languageExpressions(getLocales, "units", "pressure")[0] }}
    </div>
    <div class="details-row-caption humidity">
      {{ languageExpressions(getLocales, "climateIndicators", "humidity") }}
    </div>
    <div class="details-charts-temp">
      <ChartDetailsTemp :numData="data" />
    </div>
    <!-- <div class="details-charts-precip hidden">
      <ChartHourlyPrecip :numData="hourlyTabChartsData" />
    </div> -->
    <div
      class="details-item"
      v-for="(value, index) in data"
      :key="`th-${index}`"
    >
      <div class="time">{{ value.hour }}</div>
      <div class="details-icon">
        <BaseIcon width="40" :name="value.condition" :pick="value.light" />
      </div>
      <div class="details-temp-item"></div>
      <!-- <div class="details-precip-item"></div> -->
      <div class="details-wind-descr">
        <div>
          <div>
            <BaseIcon
              width="8"
              name="wind-direction-blue"
              pick="common"
              :transform="windDirection(getLocales, value.wind)"
            />
          </div>
          <span>{{ value.wind.wind_dir[1] }}</span>
        </div>
        <div>{{ value.wind.value }}{{ value.wind.unit }}</div>
      </div>
      <div class="details-pressure">
        {{ value.pressure.value }}
      </div>
      <div class="details-day-humidity">
        {{ value.humidity.value }}{{ value.humidity.unit }}
      </div>
    </div>
  </div>
</template>

<script>
import ChartDetailsTemp from "@/components/SVGCharts/10-day-details/ChartDetailsTemp.vue";
import { languageExpressions } from "@/constants/locales";
import { windDirection } from "@/constants/functions";

export default {
  components: {
    ChartDetailsTemp,
  },
  props: ["data"],
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
.forecast-details-container {
  position: relative;
  display: grid;
  background-color: #ffffff;
  max-width: 100%;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  padding-top: 2px;
  border: 1px solid #d8e9f3;
  border-top: none;
  border-bottom: none;
}
.details-item {
  border-top: 1px solid #d8e9f3;
  border-bottom: 1px solid #d8e9f3;
  border-right: 1px solid #d8e9f3;

  &:last-child {
    border-right: none;
  }

  & > div {
    // flex: 1;
    border-bottom: 1px solid #d8e9f3;
    position: relative;

    &:last-child,
    &:nth-child(2) {
      border-bottom: none;
    }
  }
}
.time {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  color: #333333;
  height: 33px;
}
.details-temp-item {
  height: 156px;
}
.details-precip-item {
  height: 60px;
}
.details-icon {
  display: flex;
  flex-direction: column;
  height: 80px;
  align-items: center;
  padding-top: 5px;
}
.details-row-caption {
  position: absolute;
  z-index: 11;
  background: #f5f5f5;
  border-radius: 4px;
  font-weight: 300;
  font-size: 10px;
  line-height: 14px;
  padding: 0 4px;
  color: #333333;
  white-space: nowrap;
  left: 6px;

  &.prec-sum {
    top: 330px;
  }

  &.wind {
    top: 265px;
  }
  &.pressure {
    top: 318px;
  }
  &.humidity {
    top: 354px;
  }
}
.details-charts-temp {
  position: absolute;
  top: 115px;
  width: 100%;
  height: 156px;
  z-index: 10;
}
.details-charts-precip {
  position: absolute;
  top: 324px;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 60px;
  z-index: 10;
  opacity: 0.6;
}
.details-wind-descr {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 53px;
  align-items: center;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: #333333;

  & span {
    text-transform: uppercase;
  }

  & > div:first-child {
    display: flex;
    column-gap: 3px;
  }
}
.details-pressure,
.details-day-humidity {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 36px;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: #333333;
}
.hidden {
  display: none;
}

@media only screen and (max-width: 550px) {
  .forecast-details-container {
    padding-top: 0;
    border-top: none;
  }
  .details-item {
    border-top: none;
  }
}
</style>
