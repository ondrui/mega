<template>
  <div class="forecast-details-container">
    <RowCaption class="wind">
      {{ languageExpressions(getLocales, "climateIndicators", "windDirSpeed") }}
    </RowCaption>
    <RowCaption class="pressure">
      {{ languageExpressions(getLocales, "climateIndicators", "pressure") }},
      {{ languageExpressions(getLocales, "units", "pressure")[0] }}
    </RowCaption>
    <RowCaption class="humidity">
      {{ languageExpressions(getLocales, "climateIndicators", "humidity") }}
    </RowCaption>
    <div class="details-charts-temp">
      <ChartDetailsTemp :numData="data" />
    </div>
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
        <div>{{ value.wind.value }} {{ value.wind.unit }}</div>
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
import ChartDetailsTemp from "@/components/SVGCharts/day-details/ChartDetailsTemp.vue";
import RowCaption from "@/components/RowCaption.vue";
import { languageExpressions } from "@/constants/locales";
import { windDirection } from "@/constants/functions";

export default {
  components: {
    ChartDetailsTemp,
    RowCaption,
  },
  /**
   * Масив с данными для отображения графика.
   */
  props: ["data"],
  computed: {
    /**
     * Возвращает языковую метку для определения локали.
     * @example "ru"
     */
    getLocales() {
      return this.$store.getters.getLocales;
    },
  },
  methods: {
    /**
     * Возвращает строковые константы с учетом локали.
     */
    languageExpressions,
    /**
     * Возвращает команду поворота иконки ветра в соответствие с направлением ветра.
     */
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
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.wind {
  top: 245px;
}
.pressure {
  top: 298px;
}
.humidity {
  top: 334px;
}
.details-charts-temp {
  position: absolute;
  top: 96px;
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
    padding-left: 1px;
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

@media only screen and (max-width: 600px) {
  .forecast-details-container {
    padding-top: 0;
    border-top: none;
  }
  .details-item {
    border-top: none;
  }
  .details-icon {
    height: 63px;
  }
}
</style>
