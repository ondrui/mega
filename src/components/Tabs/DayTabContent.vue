<template>
  <div>
    <div class="ten-days-container">
      <RowCaption class="wind">
        {{
          languageExpressions(getLocales, "climateIndicators", "windDirSpeed")
        }}
      </RowCaption>
      <RowCaption class="pressure">
        {{ languageExpressions(getLocales, "climateIndicators", "pressure") }},
        {{ languageExpressions(getLocales, "units", "pressure")[0] }}
      </RowCaption>
      <RowCaption class="humidity">
        {{ languageExpressions(getLocales, "climateIndicators", "humidity") }}
      </RowCaption>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            @click="toggle(index)"
            :class="[
              'ten-days-day',
              { 'ten-days-weekend': day.weekend === true },
            ]"
            v-for="(day, index) in tenDaysTabTable"
            :key="`d-${index}`"
          >
            <div class="ten-days-weekday">
              <div>{{ day.weekday }}</div>
              <div>{{ day.date }}</div>
            </div>
            <div class="ten-days-icon">
              <BaseIcon width="46" :name="day.condition" pick="light" />
            </div>
            <div class="ten-days-temp-item"></div>
            <div class="ten-days-wind-descr">
              <div>
                <div>
                  <BaseIcon
                    width="8"
                    name="wind-direction-blue"
                    pick="common"
                    :transform="windDirection(getLocales, day.wind)"
                  />
                </div>
                <span>{{ day.wind.wind_dir[1] }}</span>
              </div>
              <div>{{ day.wind.value }} {{ day.wind.unit }}</div>
            </div>
            <div class="ten-days-pressure">
              {{ day.pressure.value }}
            </div>
            <div class="ten-day-humidity">
              {{ day.humidity.value }}{{ day.humidity.unit }}
            </div>
            <div class="ten-days-chevron-down">
              <BaseIcon width="7" name="chevron-more-down" pick="common" />
            </div>
          </div>
          <div class="ten-days-charts-temp">
            <ChartsDayList />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartsDayList from "../SVGCharts/day/ChartsDayList.vue";
/**
 * RowCaption.vue - компонента для отрисовки подписей погодных параметров.
 */
import RowCaption from "@/components/RowCaption.vue";
import { languageExpressions } from "@/constants/locales";
import { windDirection } from "@/constants/functions";

export default {
  components: {
    ChartsDayList,
    RowCaption,
  },
  computed: {
    /**
     * Возвращает из store значения температур и другие данные для
     * таблицы и графика на вкладке "Прогноз погоды на 7-14 дней".
     */
    tenDaysTabTable() {
      return this.$store.getters.tenDaysTabTable;
    },
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
    /**
     * Обработчик для перехода по клику на выбранный день.
     * @param index Порядковый намер (код) выбранного дня для перехода к карточке и
     * графику с подробным прогнозом.
     */
    toggle(index) {
      /**
       * Если выбран текущий день переходим на вкладку с часовым прогнозом. В остальных случаях
       * переходим  к карточке и графику с подробным прогнозом выбранного дня,
       * путем изменения значения флага isOpen в сторе store.state.datasetsTenDays.
       */
      if (index === 0) {
        this.$emit("go");
      } else {
        this.$store.dispatch("index", index);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ten-days-container {
  position: relative;
  background-color: #ffffff;
  border: 1px solid #d8e9f3;
  border-bottom: none;
}
.swiper-container {
  display: flex;
  max-width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
}
.swiper-wrapper {
  flex: 1 0;
  position: relative;
  display: flex;
  background-color: #ffffff;
  .ten-days-weekend {
    background-color: #f7fafd;

    & .ten-days-weekday > div:first-child {
      color: #ff1616;
    }
  }
  & .ten-days-day {
    position: relative;
    flex: 1 0;
    min-width: 56px;
    transition: box-shadow 0.5s ease-in-out;
    border-bottom: 1px solid #d8e9f3;
    border-right: 1px solid #d8e9f3;

    &:nth-last-child(2) {
      border-right: none;
    }

    &:nth-child(n + 12) .ten-days-chevron-down svg {
      display: none;
    }

    &::before {
      position: absolute;
      content: "";
      transition: box-shadow 0.3s ease-in-out;
      height: 100%;
      width: 100%;
      z-index: 10;
    }

    &:nth-child(-n + 11):hover::before {
      box-shadow: inset 0 0 0 3px #d2e7ff;
      border-radius: 1px;
    }

    &:nth-child(-n + 11):hover {
      cursor: pointer;
      & .ten-days-chevron-down svg {
        transform: scale(2);
      }
    }

    & > div {
      border-bottom: 1px solid #d8e9f3;
      position: relative;

      &:last-child,
      &:nth-child(2) {
        border-bottom: none;
      }
    }
  }
}
.ten-days-temp-item {
  height: 170px;
}
.ten-days-weekday {
  height: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
}
.ten-days-weekday > div {
  text-align: center;
}
.ten-days-weekday > div:first-child {
  text-transform: uppercase;
  font-size: 16px;
  line-height: 21px;
}
.ten-days-icon {
  height: 65px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.wind {
  top: 292px;
}
.pressure {
  top: 345px;
}
.humidity {
  top: 382px;
}
.ten-days-charts-temp {
  height: 170px;
  position: absolute;
  top: 123px;
  width: 100%;
  // z-index: 10;
  cursor: pointer;
}
.ten-days-wind-descr {
  height: 53px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #333333;

  & span {
    text-transform: uppercase;
    padding-left: 1px;
  }

  & > div:first-child {
    display: flex;
    column-gap: 3px;
  }
}
.ten-days-pressure,
.ten-day-humidity {
  height: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: #333333;
}
.ten-days-chevron-down {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22px;

  & svg {
    transition: transform 0.3s ease-in-out;
  }
}
@media only screen and (max-width: 630px) {
  .ten-days-container {
    border: 1px solid #d8e9f3;
  }
  // .swiper-container {
  //   overflow-x: scroll;
  // }
}
@media only screen and (max-width: 450px) {
  .ten-days-icon svg {
    width: 30px;
  }
}
</style>
