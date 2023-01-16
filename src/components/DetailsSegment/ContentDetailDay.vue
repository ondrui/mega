<template>
  <div class="hourly-tab-container">
    <!-- <div class="hourly-row-caption prec-sum">
      {{ languageExpressions(getLocales, "climateIndicators", "precSum") }}
    </div> -->
    <div class="hourly-row-caption wind">
      {{ languageExpressions(getLocales, "climateIndicators", "windDirSpeed") }}
    </div>
    <div class="hourly-row-caption pressure">
      {{ languageExpressions(getLocales, "climateIndicators", "pressure") }},
      {{ languageExpressions(getLocales, "units", "pressure")[0] }}
    </div>
    <div class="hourly-row-caption humidity">
      {{ languageExpressions(getLocales, "climateIndicators", "humidity") }}
    </div>
    <!-- <div class="hourly-charts-temp hidden">
      <ChartHourlyTemp :numData="hourlyTabChartsData" />
    </div>
    <div class="hourly-charts-precip hidden">
      <ChartHourlyPrecip :numData="hourlyTabChartsData" />
    </div> -->
    <div class="hourly-data-container">
      <div
        class="hourly-item"
        v-for="(value, index) in data"
        :key="`th-${index}`"
      >
        <div class="time">{{ value.hour }}</div>
        <div class="hourly-icon">
          <BaseIcon width="40" :name="value.condition" :pick="value.light" />
        </div>
        <div class="hourly-temp-item"></div>
        <!-- <div class="hourly-precip-item"></div> -->
        <div class="hourly-wind-descr">
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
        <div class="hourly-pressure">
          {{ value.pressure.value }}
        </div>
        <div class="hourly-day-humidity">
          {{ value.humidity.value }}{{ value.humidity.unit }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
import { windDirection } from "@/constants/functions";

export default {
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
.hourly-tab-container {
  position: relative;
  background-color: #ffffff;
  padding-top: 2px;
}
.hourly-data-container {
  display: flex;
}
.hourly-item {
  flex: 1;
  border: 1px solid #d8e9f3;
  margin-right: -1px;

  &:last-child {
    margin-right: 0;
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
  padding: 7px 0;
}
.hourly-temp-item {
  height: 180px;
}
.hourly-precip-item {
  height: 60px;
}
.hourly-icon {
  display: flex;
  flex-direction: column;
  height: 80px;
  align-items: center;
  padding-top: 5px;
}
.hourly-row-caption {
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
    top: 294px;
  }
  &.pressure {
    top: 443px;
  }
  &.humidity {
    top: 479px;
  }
}
.hourly-charts-temp {
  position: absolute;
  top: 136px;
  width: 100%;
  height: 170px;
  z-index: 10;
}
.hourly-charts-precip {
  position: absolute;
  top: 324px;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 60px;
  z-index: 10;
  opacity: 0.6;
}
.hourly-wind-descr {
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
.hourly-pressure,
.hourly-day-humidity {
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
  .hourly-icon svg {
    width: 30px;
  }
}
</style>
