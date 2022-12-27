<template>
  <div>
    <div class="hourly-tab-container">
      <div class="scroll-button-container">
        <button class="left-btn btn">
          <BaseIcon width="7" name="chevron-scroll-left" pick="common" />
        </button>
        <button class="rightt-btn btn">
          <BaseIcon width="7" name="chevron-scroll-right" pick="common" />
        </button>
      </div>
      <div class="hourly-row-caption prec-sum">
        {{ languageExpressions(getLocales, "climateIndicators", "precSum") }}
      </div>
      <div class="hourly-row-caption wind">
        {{
          languageExpressions(getLocales, "climateIndicators", "windDirSpeed")
        }}
      </div>
      <div class="hourly-row-caption pressure">
        {{ languageExpressions(getLocales, "climateIndicators", "pressure") }},
        {{ languageExpressions(getLocales, "units", "pressure")[0] }}
      </div>
      <div class="hourly-row-caption humidity">
        {{ languageExpressions(getLocales, "climateIndicators", "humidity") }}
      </div>
      <div class="content-wrapper">
        <div class="wrapper">
          <div class="hourly-charts-temp">
            <ChartHourlyTemp
              :numData="hourlyChartsData"
              :unitValues="hourlyPropTitle"
            />
          </div>
          <div class="hourly-charts-precip">
            <ChartHourlyPrecip
              :numValues="hourlyChartsData"
              :unitValues="hourlyPropTitle"
            />
          </div>
          <div
            class="date-container"
            v-for="(date, index) in hourlyPropTitle"
            :key="`d-${index}`"
          >
            <div class="date-header">
              <span
                ><b>{{ date.date[0] }}</b></span
              >
              <span>&nbsp; {{ date.date[1] }}</span>
            </div>
            <div class="hourly-data-container">
              <div
                class="hourly-item"
                v-for="(value, index) in date.values"
                :key="`h-${index}`"
              >
                <div class="time">{{ value.hour }}</div>
                <div class="hourly-icon">
                  <BaseIcon
                    width="34"
                    :name="value.condition"
                    :pick="value.light"
                  />
                </div>
                <div class="hourly-temp-item"></div>
                <div class="hourly-precip-item"></div>
                <div class="hourly-wind-descr">
                  <div>
                    <div>
                      <BaseIcon
                        width="8"
                        name="wind-direction-blue"
                        pick="common"
                        :transform="windDirection(getLocales, value)"
                      />
                    </div>
                    <span>{{ value.wind_dir[1] }}</span>
                  </div>
                  <div>{{ value.wind_speed }}</div>
                </div>
                <div class="hourly-pressure">
                  {{ value.pressure }}
                </div>
                <div class="hourly-day-humidity">
                  {{ value.humidity }}{{ value.humidity.unit }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartHourlyTemp from "../SVGCharts/hourly-temp/ChartHourlyTemp.vue";
import ChartHourlyPrecip from "../SVGCharts/hourly-temp/ChartHourlyPrecip.vue";
import { languageExpressions } from "@/constants/locales";
import { windDirection } from "@/constants/functions";

export default {
  components: {
    ChartHourlyTemp,
    ChartHourlyPrecip,
  },
  computed: {
    hourlyChartsData() {
      return this.$store.getters.hourlyChartsData;
    },
    hourlyPropTitle() {
      return this.$store.getters.hourlyPropTitle;
    },
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
  border: 1px solid #d8e9f3;
  // margin: 0 -1px;
}
.content-wrapper {
  display: flex;
  max-width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
}
.wrapper {
  display: flex;
  position: relative;
}
.date-container {
  display: flex;
  flex-direction: column;
}
.date-header {
  white-space: nowrap;
  padding: 9px 0 8px 13px;
  border-right: 1px solid #d8e9f3;
  margin-right: -1px;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  color: #333333;

  &::first-letter {
    text-transform: capitalize;
  }
}
.date-container:last-child .date-header {
  border-right: none;
}
.hourly-data-container {
  display: flex;

  & .hourly-item {
    border: 1px solid #d8e9f3;
    margin-right: -1px;
    width: 56px;
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
}
.date-container:last-child .hourly-item:last-child {
  border-right: none;
}
.date-container:first-child .hourly-item:first-child {
  border-left: none;
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
    top: 325px;
  }

  &.wind {
    top: 385px;
  }
  &.pressure {
    top: 438px;
  }
  &.humidity {
    top: 474px;
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
  top: 306px;
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
  height: 53px;
  align-items: center;
  padding-top: 16px;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
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
  height: 36px;
  align-items: center;
  padding-top: 14px;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: #333333;
}

.scroll-button-container {
  position: absolute;
  top: calc(50% - 18px);
  left: 18px;
  z-index: 20;
  width: calc(100% - 36px);
  display: flex;
  justify-content: space-between;
  & .btn {
    pointer-events: auto;
    background-color: rgba(29, 125, 188, 0.08);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    width: 36px;
    height: 36px;
    touch-action: manipulation;
  }
}

@media only screen and (max-width: 550px) {
  .hourly-icon svg {
    width: 30px;
  }
}
</style>
